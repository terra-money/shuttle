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
  const collectedFees: [string, BigNumber][] = supplies.map((supply) => {
    const asset = supply[0];
    const ethSideBalance = supply[1].div('1000000000000');
    const terraSideBalance = balanceMap[asset];

    const collectedFeeAmount = feeCollector.isEthAsset(asset)
      ? ethSideBalance.minus(terraSideBalance)
      : terraSideBalance.minus(ethSideBalance);

    return [asset, collectedFeeAmount];
  });

  const txHash = await feeCollector.transfer(
    collectedFees.filter((fee) => fee[1].isPositive())
  );

  console.info(`TxHash: ${txHash}`);
}

main().then();
