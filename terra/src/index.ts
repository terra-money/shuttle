require('dotenv').config();

import Shuttle from './Shuttle';

const shuttle = new Shuttle();

console.info(`
Start ShuttleTerra
\n
TERRA_CHAIN_ID: ${process.env.TERRA_CHAIN_ID}
ETH_CHAIN_ID: ${process.env.ETH_CHAIN_ID}
\n
TERRA_TRACKING_ADDR: ${process.env.TERRA_TRACKING_ADDR}
\n
FEE_RATE: ${process.env.FEE_RATE}
FEE_MIN_AMOUNT: ${process.env.FEE_MIN_AMOUNT}
FEE_QUOTE_TICKER: ${process.env.FEE_QUOTE_TICKER}
-----------------------------------------------------------
\n\n
`);

shuttle.startMonitoring().catch((err) => {
  console.error(`Exit with ${err}`);
});
