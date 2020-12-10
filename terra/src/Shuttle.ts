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

const REDIS_PREFIX = 'terra_shuttle';
const KEY_LAST_HEIGHT = 'last_height';
const KEY_LAST_TXHASH = 'last_txhash';

const KEY_QUEOE_TX = 'queue_tx';

const TERRA_BLOCK_SECOND = parseInt(process.env.TERRA_BLOCK_SECOND as string);
const REDIS_URL = process.env.REDIS_URL as string;

const SLACK_NOTI_NETWORK = process.env.SLACK_NOTI_NETWORK;
const SLACK_WEB_HOOK = process.env.SLACK_WEB_HOOK;

const ax = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 15000,
});

class Shuttle {
  monitoring: Monitoring;
  relayer: Relayer;
  getAsync: (key: string) => Promise<string | null>;
  setAsync: (key: string, val: string) => Promise<unknown>;
  delAsync: (key: string) => Promise<unknown>;
  llenAsync: (key: string) => Promise<number>;
  lrangeAsync: (
    key: string,
    start: number,
    stop: number
  ) => Promise<string[] | undefined>;
  lpopAsync: (key: string) => Promise<string | undefined>;
  rpushAsync: (key: string, value: string) => Promise<unknown>;

  nonce: number;

  constructor() {
    // Redis setup
    const redisClient = redis.createClient(REDIS_URL, { prefix: REDIS_PREFIX });

    this.getAsync = promisify(redisClient.get).bind(redisClient);
    this.setAsync = promisify(redisClient.set).bind(redisClient);
    this.delAsync = promisify(redisClient.del).bind(redisClient);
    this.llenAsync = promisify(redisClient.llen).bind(redisClient);
    this.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
    this.lpopAsync = promisify(redisClient.lpop).bind(redisClient);
    this.rpushAsync = promisify(redisClient.rpush).bind(redisClient);

    this.monitoring = new Monitoring();
    this.relayer = new Relayer();

    this.nonce = 0;
  }

  async startMonitoring() {
    this.nonce = await this.relayer.loadNonce();

    // Graceful shutdown
    let shutdown = false;

    const gracefulShutdown = () => {
      shutdown = true;
    };

    process.once('SIGINT', gracefulShutdown);
    process.once('SIGTERM', gracefulShutdown);

    while (!shutdown) {
      await this.process().catch(async (err) => {
        const errorMsg =
          err instanceof Error ? err.toString() : JSON.stringify(err);

        console.error(`Process failed: ${errorMsg}`);

        // ignore invalid project id error
        if (errorMsg.includes('invalid project id')) {
          return;
        }

        if (SLACK_WEB_HOOK !== undefined && SLACK_WEB_HOOK !== '') {
          const { data } = await ax.post(SLACK_WEB_HOOK, {
            text: `[${SLACK_NOTI_NETWORK}] Problem Happened: ${errorMsg} '<!channel>'`,
          });

          console.info(`Notify Error to Slack: ${data}`);
        }

        // sleep 10s after error
        await Bluebird.delay(9500);
      });

      await Bluebird.delay(500);
    }

    console.info('##### Graceful Shutdown #####');
    process.exit(0);
  }

  async process() {
    const lastHeight = parseInt((await this.getAsync(KEY_LAST_HEIGHT)) || '0');
    const [newLastHeight, monitoringDatas] = await this.monitoring.load(
      lastHeight
    );

    // Relay to terra chain
    // To prevent duplicate relay, set string KEY_LAST_TXHASH.
    // When the KEY_LAST_TXHASH exists, skip relay util that txhash
    const lastTxHash = await this.getAsync(KEY_LAST_TXHASH);
    let i = 0;

    // Skip to lastTxHash
    for (; lastTxHash && i < monitoringDatas.length; i++) {
      const monitoringData = monitoringDatas[i];

      if (lastTxHash === monitoringData.txHash) {
        i++; // start from next index
        break;
      }
    }

    for (; i < monitoringDatas.length; i++) {
      const monitoringData = monitoringDatas[i];
      const relayData = await this.relayer.build(monitoringData, this.nonce++);

      await this.rpushAsync(KEY_QUEOE_TX, JSON.stringify(relayData));
      await this.setAsync(KEY_LAST_TXHASH, monitoringData.txHash);

      // Notify to slack
      if (SLACK_WEB_HOOK !== undefined && SLACK_WEB_HOOK !== '') {
        await ax.post(
          SLACK_WEB_HOOK,
          buildSlackNotification(monitoringData, relayData.txHash)
        );
      }

      console.info(`Relay Success: ${relayData.txHash}`);

      // logging first and do relay later
      await this.relayer.relay(relayData);
    }

    // Update last_height
    await this.setAsync(KEY_LAST_HEIGHT, newLastHeight.toString());
    await this.delAsync(KEY_LAST_TXHASH);

    console.info(`HEIGHT: ${newLastHeight}`);

    // When catched the block height, wait blocktime
    if (newLastHeight === lastHeight) {
      await Bluebird.delay(TERRA_BLOCK_SECOND * 1000);
    }

    await this.checkTxQueue();
  }

  async checkTxQueue() {
    const now = new Date().getTime();
    const len = await this.llenAsync(KEY_QUEOE_TX);

    if (len === 0) {
      return;
    }

    const relayDatas =
      (await this.lrangeAsync(KEY_QUEOE_TX, 0, Math.min(4, len))) || [];

    return Bluebird.mapSeries(relayDatas, async (data) => {
      const relayData: RelayData = JSON.parse(data);
      const tx = await this.relayer.getTransaction(relayData.txHash);

      if (tx !== null) {
        // tx found in mempool, remove it
        await this.lpopAsync(KEY_QUEOE_TX);
      } else if (tx === null) {
        if (now - relayData.createdAt > 1000 * 60) {
          // tx not found in the mempool, rebroadcast tx
          await this.relayer.relay(relayData);
        }
      }
    });
  }
}

function buildSlackNotification(
  data: MonitoringData,
  resultTxHash: string
): { text: string } {
  let notification = '```';
  notification += `[${SLACK_NOTI_NETWORK}] TERRA => ETH\n`;
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
  notification += `Eth TxHash:   ${resultTxHash}\n`;
  notification += '```';
  const text = `${notification}`;

  return {
    text,
  };
}

export = Shuttle;
