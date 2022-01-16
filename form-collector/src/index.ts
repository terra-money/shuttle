import Express from 'express';
import { promisify } from 'util';
import redis from 'redis';

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const REDIS_URL = process.env.REDIS_URL as string;
const LISTEN_PORT = process.env.LISTEN_PORT as string;

const REDIS_PREFIX = 'eth_shuttle' + ETH_CHAIN_ID.replace('mainnet', '');
const KEY_QUEUE_MISSING_TX = 'queue_missing_tx';

const redisClient = redis.createClient(REDIS_URL, { prefix: REDIS_PREFIX });
const rpushAsync: (key: string, value: string) => Promise<unknown> = promisify(
  redisClient.rpush
).bind(redisClient);
const lremAsync: (
  key: string,
  count: number,
  val: string
) => Promise<number | undefined> = promisify(redisClient.lrem).bind(
  redisClient
);

const app = Express();

app.post('/recover', async (req, res) => {
  const { txhash } = req.body;

  if (validate_txhash(txhash)) {
    await lremAsync(KEY_QUEUE_MISSING_TX, 1, txhash);
    await rpushAsync(KEY_QUEUE_MISSING_TX, txhash);
  }

  res.end();
});

const port = parseInt(LISTEN_PORT);
app.listen(port, '0.0.0.0', () => {
  console.info(`form-collector app listening on port ${port}`);
});

function validate_txhash(addr: string): boolean {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr) && addr.length === 66;
}
