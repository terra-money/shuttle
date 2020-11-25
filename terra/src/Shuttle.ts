import redis from 'redis';
import axios from 'axios';
import * as http from 'http';
import * as https from 'https';
import { promisify } from 'util';
import BigNumber from 'bignumber.js';

import { Monitoring, MonitoringData } from './Monitoring';
import Relayer from './Relayer';

const REDIS_PREFIX = 'terra_shuttle';
const KEY_LAST_HEIGHT = 'last_height';
const KEY_LAST_TXHASH = 'last_txhash';

const TERRA_BLOCK_SECOND = parseInt(process.env.TERRA_BLOCK_SECOND as string);
const REDIS_URL = process.env.REDIS_URL as string;
const SLACK_WEB_HOOK = process.env.SLACK_WEB_HOOK;

const ax = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 15000
});

class Shuttle {
  monitoring: Monitoring;
  relayer: Relayer;
  getAsync: (key: string) => Promise<string | null>;
  setAsync: (key: string, val: string) => Promise<unknown>;
  delAsync: (key: string) => Promise<unknown>;

  constructor() {
    // Redis setup
    const redisClient = redis.createClient(REDIS_URL, { prefix: REDIS_PREFIX });

    this.getAsync = promisify(redisClient.get).bind(redisClient);
    this.setAsync = promisify(redisClient.set).bind(redisClient);
    this.delAsync = promisify(redisClient.del).bind(redisClient);

    this.monitoring = new Monitoring();
    this.relayer = new Relayer();
  }

  async startMonitoring() {
    // Graceful shutdown
    let shutdown = false;
    process.once('SIGINT', () => {
      shutdown = true;
    });
    process.once('SIGTERM', () => {
      shutdown = true;
    });

    while (!shutdown) {
      await this.process().catch(async (err) => {
        const errorMsg =
          err instanceof Error ? err.toString() : JSON.stringify(err);
        console.error(`Process failed: ${errorMsg}`);

        if (SLACK_WEB_HOOK !== undefined) {
          const { data } = await ax.post(SLACK_WEB_HOOK, {
            text: `Problem Happends: ${errorMsg}`
          });

          console.log(`Notify Error to Slack: ${data}`);
        }

        // sleep 10s after error
        await this.sleep(9500);
      });

      await this.sleep(500);
    }

    console.log('##### Graceful Shutdown #####');
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
    let relayFlag = false;
    const lastTxHash = await this.getAsync(KEY_LAST_TXHASH);
    for (let i = 0; i < monitoringDatas.length; i++) {
      const monitoringData = monitoringDatas[i];
      if (!relayFlag && lastTxHash !== undefined) {
        if (lastTxHash === monitoringData.txHash) {
          relayFlag = true;
          continue;
        }
      }

      const txhash = await this.relayer.relay(monitoringData);
      await this.setAsync(KEY_LAST_TXHASH, txhash);

      // Notify to slack
      if (SLACK_WEB_HOOK !== undefined) {
        await ax.post(
          SLACK_WEB_HOOK,
          this.buildSlackNotification(monitoringData, txhash)
        );
      }

      console.log(`Relay Success: ${txhash}`);
    }

    // Update last_height
    await this.setAsync(KEY_LAST_HEIGHT, newLastHeight.toString());
    await this.delAsync(KEY_LAST_TXHASH);

    console.log(`HEIGHT: ${newLastHeight}`);

    // When catched the block height, wait blocktime
    if (newLastHeight === lastHeight) {
      await this.sleep(TERRA_BLOCK_SECOND * 1000);
    }
  }

  buildSlackNotification(
    data: MonitoringData,
    resultTxHash: string
  ): { text: string } {
    let notification = '```';
    notification += `TERRA => ETH\n`;
    notification += `Sender: ${data.sender}\n`;
    notification += `To:     ${data.to}\n`;
    notification += `Amount: ${new BigNumber(data.amount)
      .div(1e6)
      .toFixed(6)} ${data.asset}\n`;
    notification += `\n`;
    notification += `Terra TxHash: ${data.txHash}\n`;
    notification += `Eth TxHash:   ${resultTxHash}\n`;
    notification += '```';
    const text = `${notification}`;

    return {
      text
    };
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export = Shuttle;
