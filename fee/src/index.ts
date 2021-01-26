require('dotenv').config();

import { FeeCollector } from './FeeCollector';
import BigNumber from 'bignumber.js';

async function main() {
  const feeCollector = new FeeCollector();
  const balances = await feeCollector.getBalances();
  const balanceMap: { [asset: string]: BigNumber } = {};
  balances.forEach((balance) => {
    balanceMap[balance[0]] = balance[1];
  });

  const supplies = await feeCollector.getTotalSupplies();
  const collectedFees: [string, string][] = supplies.map((supply) => {
    const asset = supply[0];
    const ethSideBalance = supply[1].div('1000000000000');
    const terraSideBalance = balanceMap[asset];

    const collectedFeeAmount = terraSideBalance.gt(ethSideBalance)
      ? terraSideBalance.minus(ethSideBalance).toFixed(0)
      : '0';

    return [asset, collectedFeeAmount];
  });

  const txHash = await feeCollector.transfer(collectedFees);
  console.info(`TxHash: ${txHash}`);
}

main().then();
