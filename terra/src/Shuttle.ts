import redis from 'redis';
import axios from 'axios';
import * as http from 'http';
import * as https from 'https';
import { promisify } from 'util';
import BigNumber from 'bignumber.js';
import Bluebird from 'bluebird';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

import { Monitoring, MonitoringData } from './Monitoring';
import { Relayer, RelayData } from './Relayer';
import { DynamoDB } from './DynamoDB';

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const ETH_BLOCK_CONFIRMATION = parseInt(
  process.env.ETH_BLOCK_CONFIRMATION as string
);

// skip chain-id prefix for mainnet
const REDIS_PREFIX = 'terra_shuttle' + ETH_CHAIN_ID.replace('mainnet', '');
const KEY_LAST_HEIGHT = 'last_height';
const KEY_LAST_TXHASH = 'last_txhash';
const KEY_NEXT_NONCE = 'next_nonce';
const KEY_MINTER_ADDRESS = 'minter_address';
const KEY_NEXT_MINTER_NONCE = 'next_minter_nonce';

const KEY_QUEUE_TX = 'queue_tx';

const TERRA_BLOCK_SECOND = parseInt(process.env.TERRA_BLOCK_SECOND as string);
const REDIS_URL = process.env.REDIS_URL as string;

const SLACK_NOTI_NETWORK = process.env.SLACK_NOTI_NETWORK;
const SLACK_NOTI_ETH_ASSET = process.env.SLACK_NOTI_ETH_ASSET;
const SLACK_WEB_HOOK = process.env.SLACK_WEB_HOOK;

const ax = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 15000,
});

class Shuttle {
  monitoring: Monitoring;
  relayer: Relayer;
  dynamoDB: DynamoDB;

  getAsync: (key: string) => Promise<string | null>;
  setAsync: (key: string, val: string) => Promise<unknown>;
  delAsync: (key: string) => Promise<unknown>;
  llenAsync: (key: string) => Promise<number>;
  lsetAsync: (key: string, index: number, val: string) => Promise<unknown>;
  lrangeAsync: (
    key: string,
    start: number,
    stop: number
  ) => Promise<string[] | undefined>;
  lremAsync: (
    key: string,
    count: number,
    val: string
  ) => Promise<number | undefined>;
  rpushAsync: (key: string, value: string) => Promise<unknown>;

  nonce: number;
  minterNonce: number;
  errorCounter: number;

  stopOperation: boolean;

  constructor() {
    // Redis setup
    const redisClient = redis.createClient(REDIS_URL, { prefix: REDIS_PREFIX });

    this.getAsync = promisify(redisClient.get).bind(redisClient);
    this.setAsync = promisify(redisClient.set).bind(redisClient);
    this.delAsync = promisify(redisClient.del).bind(redisClient);
    this.llenAsync = promisify(redisClient.llen).bind(redisClient);
    this.lsetAsync = promisify(redisClient.lset).bind(redisClient);
    this.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
    this.lremAsync = promisify(redisClient.lrem).bind(redisClient);
    this.rpushAsync = promisify(redisClient.rpush).bind(redisClient);

    this.monitoring = new Monitoring();
    this.relayer = new Relayer();
    this.dynamoDB = new DynamoDB();

    this.nonce = 0;
    this.minterNonce = 0;
    this.errorCounter = 0;
    this.stopOperation = false;
  }

  async startMonitoring() {
    const nonce = await this.getAsync(KEY_NEXT_NONCE);
    if (nonce && nonce !== '') {
      this.nonce = parseInt(nonce);
    } else {
      this.nonce = await this.relayer.loadNonce();
    }

    const minterNonce = await this.getAsync(KEY_NEXT_MINTER_NONCE);
    if (minterNonce && minterNonce !== '') {
      this.minterNonce = parseInt(minterNonce);
    } else {
      this.minterNonce = 1;
    }

    // If minter address is set,
    // we check the address is current owner of token contracts
    if (this.monitoring.minterAddress) {
      const minterAddress = await this.getAsync(KEY_MINTER_ADDRESS);
      if (this.monitoring.minterAddress !== minterAddress) {
        const gasPrice = new BigNumber(await this.relayer.getGasPrice())
          .multipliedBy(1.2)
          .toFixed(0);

        for (const tokenContractAddr of Object.values(
          this.monitoring.EthContracts
        )) {
          let relayData: RelayData;
          if (minterAddress && minterAddress !== '') {
            relayData = await this.relayer.transferOwnershipMultiSig(
              minterAddress,
              this.monitoring.minterAddress as string,
              tokenContractAddr,
              this.nonce++,
              this.minterNonce++,
              gasPrice
            );
          } else {
            relayData = await this.relayer.transferOwnership(
              this.monitoring.minterAddress as string,
              tokenContractAddr,
              this.nonce++,
              gasPrice
            );
          }

          await this.rpushAsync(KEY_QUEUE_TX, JSON.stringify(relayData));
          await this.setAsync(KEY_NEXT_NONCE, this.nonce.toString());
          await this.setAsync(
            KEY_NEXT_MINTER_NONCE,
            this.minterNonce.toString()
          );

          console.info(`Ownership Transfer Success: ${relayData.txHash}`);
          await this.relayer.relay(relayData);

          // Delay 500ms
          await Bluebird.delay(500);
        }

        // reset nonce to 1
        this.minterNonce = 1;
        await this.setAsync(KEY_MINTER_ADDRESS, this.monitoring.minterAddress);
        await this.setAsync(KEY_NEXT_MINTER_NONCE, this.minterNonce.toString());
      }
    }

    // Graceful shutdown
    let shutdown = false;

    const gracefulShutdown = () => {
      shutdown = true;
    };

    process.once('SIGINT', gracefulShutdown);
    process.once('SIGTERM', gracefulShutdown);

    while (!shutdown) {
      // If unrecoverable problem happens, just wait until
      // manager solve the problem.
      if (this.stopOperation) {
        await Bluebird.delay(600 * 1000);
        continue;
      }

      await this.process().catch(async (err) => {
        const errorMsg =
          err instanceof Error ? err.toString() : JSON.stringify(err);

        console.error(`Process failed: ${errorMsg}`);

        // ignore invalid project id error
        if (
          errorMsg.includes('invalid project id') ||
          err.message.includes('502 Bad Gateway') ||
          err.message.includes('ESOCKETTIMEDOUT') ||
          err.message.includes('internal service failure') ||
          err.message.includes('Invalid JSON RPC response') ||
          err.message.includes('handle request error') ||
          err.message.includes('Gateway timeout') ||
          err.message.includes('transaction underpriced')
        ) {
          if (this.errorCounter++ < 5) {
            // Delay 5s
            await Bluebird.delay(10 * 500);

            return;
          }

          // reset error counter to zero
          this.errorCounter = 0;
        }

        if (SLACK_WEB_HOOK !== undefined && SLACK_WEB_HOOK !== '') {
          await ax
            .post(SLACK_WEB_HOOK, {
              text: `[${SLACK_NOTI_NETWORK}] Problem Happened: ${errorMsg} '<!channel>'`,
            })
            .catch(() => {
              console.error('Slack Notification Error');
            });
        }

        // sleep 60s after error
        await Bluebird.delay(60 * 1000);
      });

      await Bluebird.delay(500);
    }

    console.info('##### Graceful Shutdown #####');
    process.exit(0);
  }

  async process() {
    // Check whether tx is successfully broadcasted or not
    // If a tx is not found in a block for a long period,
    // rebroadcast the tx with same nonce.
    await this.checkTxQueue();

    const lastHeight = parseInt((await this.getAsync(KEY_LAST_HEIGHT)) || '0');
    const [newLastHeight, monitoringDatas] = await this.monitoring.load(
      lastHeight
    );

    // Relay to Ethereum chain
    // To prevent duplicate relay, set string KEY_LAST_TXHASH.
    // When the KEY_LAST_TXHASH exists, skip relay util that txhash
    const lastTxHash = await this.getAsync(KEY_LAST_TXHASH);

    // Skip to lastTxHash
    for (let i = 0; lastTxHash && i < monitoringDatas.length; i++) {
      if (lastTxHash === monitoringDatas[i].txHash) {
        // Remove processed data inclusively
        monitoringDatas.splice(0, i + 1);
        break;
      }
    }

    if (monitoringDatas.length > 0) {
      // Batch load processed txs from the dynamoDB
      const existingTxs = await this.dynamoDB.hasTransactions(
        monitoringDatas.map((v) => v.txHash)
      );

      // Filter out already processed items
      const monitoringDataAfterFilter = monitoringDatas.filter(
        (v) => !existingTxs[v.txHash]
      );

      // load latest gas price
      const gasPrice = new BigNumber(await this.relayer.getGasPrice())
        .multipliedBy(1.2)
        .toFixed(0);

      const relayDatas: RelayData[] = [];
      for (const monitoringData of monitoringDataAfterFilter) {
        const relayData: RelayData = this.monitoring.minterAddress
          ? await this.relayer.buildMultiSig(
              monitoringData,
              this.monitoring.minterAddress,
              this.nonce++,
              this.minterNonce++,
              gasPrice
            )
          : await this.relayer.build(monitoringData, this.nonce++, gasPrice);

        await this.rpushAsync(KEY_QUEUE_TX, JSON.stringify(relayData));
        await this.setAsync(KEY_LAST_TXHASH, monitoringData.txHash);
        await this.setAsync(KEY_NEXT_NONCE, this.nonce.toString());
        await this.setAsync(KEY_NEXT_MINTER_NONCE, this.minterNonce.toString());

        // Notify to slack
        if (SLACK_WEB_HOOK !== undefined && SLACK_WEB_HOOK !== '') {
          await ax
            .post(
              SLACK_WEB_HOOK,
              buildSlackNotification(monitoringData, relayData.txHash)
            )
            .catch(() => {
              console.error('Slack Notification Error');
            });
        }

        relayDatas.push(relayData);
        console.info(`Relay Success: ${relayData.txHash}`);
      }

      // Update last_height
      await this.setAsync(KEY_LAST_HEIGHT, newLastHeight.toString());
      await this.delAsync(KEY_LAST_TXHASH);

      // Batch write transaction info
      await this.dynamoDB.storeTransactions(
        monitoringDataAfterFilter.map((v, i) => {
          return {
            sender: v.sender,
            asset: v.asset,
            amount: v.amount,
            recipient: v.to,
            fromTxHash: v.txHash,
            toTxHash: relayDatas[i].txHash,
          };
        })
      );

      // Relay transaction
      for (const relayData of relayDatas) {
        await this.relayer.relay(relayData);
      }
    } else {
      await this.setAsync(KEY_LAST_HEIGHT, newLastHeight.toString());
      await this.delAsync(KEY_LAST_TXHASH);
    }

    console.info(`HEIGHT: ${newLastHeight}`);
    this.errorCounter--;

    // When catch the block height, wait block time
    if (newLastHeight === lastHeight) {
      await Bluebird.delay(TERRA_BLOCK_SECOND * 1000);
    }
  }

  async checkTxQueue() {
    await this.lremAsync(KEY_QUEUE_TX, 10, 'DELETE');

    const now = new Date().getTime();
    const len = await this.llenAsync(KEY_QUEUE_TX);

    if (len === 0) {
      return;
    }

    const relayDatas =
      (await this.lrangeAsync(KEY_QUEUE_TX, 0, Math.min(10, len))) || [];

    const targetGasPrice = (await this.relayer.getGasPrice()).multipliedBy(1.2);
    const latestBlockNumber = await this.relayer.getBlockNumber();
    const trustedBlockNumber = latestBlockNumber - ETH_BLOCK_CONFIRMATION;

    await Bluebird.mapSeries(relayDatas, async (data, idx) => {
      const relayData: RelayData = JSON.parse(data);
      if (now - relayData.createdAt < 1000 * 60) {
        return;
      }

      const txReceipt = await this.relayer
        .getTransactionReceipt(relayData.txHash)
        .catch((err) => {
          if (err.message.includes('Invalid JSON RPC response')) {
            return null;
          }

          throw err;
        });

      if (txReceipt === null) {
        // tx not found in the mempool or block,
        // rebroadcast tx with increased gas price
        const newRelayData = await this.relayer.increaseGasPrice(
          relayData,
          targetGasPrice
        );

        const replaced = relayData.txHash !== newRelayData.txHash;
        if (replaced) {
          await this.lsetAsync(KEY_QUEUE_TX, idx, JSON.stringify(newRelayData));

          if (relayData.fromTxHash) {
            await this.dynamoDB.updateReplaceTxHashes(
              relayData.fromTxHash,
              newRelayData.txHash
            );
          }
        }

        // Relay even though the tx info is not changed
        await this.relayer.relay(newRelayData).catch(async (err) => {
          // Sometimes, there are possibilities
          // that tx is found during rebroadcast
          if (
            err.message === 'already known' ||
            err.message === 'replacement transaction underpriced' ||
            err.message === 'nonce too low'
          ) {
            // Tx is in pending state; wait
            return;
          } else {
            // Unknown problem happened
            throw err;
          }
        });
      } else if (
        txReceipt.status &&
        txReceipt.blockNumber <= trustedBlockNumber
      ) {
        // tx found in block, remove it
        await this.lsetAsync(KEY_QUEUE_TX, idx, 'DELETE');
      } else if (!txReceipt.status) {
        // tx is failed; stop shuttle operations
        this.stopOperation = true;
        throw new Error(
          `Tx failed; ${relayData.txHash} please check the problem`
        );
      }
    });

    await this.lremAsync(KEY_QUEUE_TX, 10, 'DELETE');
  }
}

function buildSlackNotification(
  data: MonitoringData,
  resultTxHash: string
): { text: string } {
  let notification = '```';
  notification += `[${SLACK_NOTI_NETWORK}] TERRA => ${SLACK_NOTI_ETH_ASSET}\n`;
  notification += `Sender: ${data.sender}\n`;
  notification += `To:     ${data.to}\n`;
  notification += `\n`;
  notification += `Requested: ${new BigNumber(data.requested)
    .div(1e6)
    .toFixed(6)} ${data.asset}\n`;
  notification += `Amount:    ${new BigNumber(data.amount)
    .div(1e6)
    .toFixed(6)} ${data.asset}\n`;
  notification += `Fee:       ${new BigNumber(data.fee).div(1e6).toFixed(6)} ${
    data.asset
  }\n`;
  notification += `\n`;
  notification += `Terra TxHash: ${data.txHash}\n`;
  notification += `${SLACK_NOTI_ETH_ASSET} TxHash:   ${resultTxHash}\n`;
  notification += '```';
  const text = `${notification}`;

  return {
    text,
  };
}

export = Shuttle;
