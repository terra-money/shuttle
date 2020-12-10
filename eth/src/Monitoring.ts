import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';
import { hexToBytes } from 'web3-utils';
import bech32 from 'bech32';
import BigNumber from 'bignumber.js';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';

const FEE_RATE = process.env.FEE_RATE as string;

const ETH_URL = process.env.ETH_URL as string;
const ETH_BLOCK_LOAD_UNIT = parseInt(process.env.ETH_BLOCK_LOAD_UNIT as string);
const ETH_BLOCK_CONFIRMATION = parseInt(
  process.env.ETH_BLOCK_CONFIRMATION as string
);

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;

const MAX_RETRY = 5;
export class Monitoring {
  Web3: Web3;

  EthContracts: { [asset: string]: Contract };
  TerraAssetInfos: {
    [asset: string]: TerraAssetInfo;
  };

  constructor() {
    // Register eth chain infos
    this.Web3 = new Web3(ETH_URL);

    const ethContractInfos = EthContractInfos[ETH_CHAIN_ID];
    const terraAssetInfos = TerraAssetInfos[TERRA_CHAIN_ID];

    this.EthContracts = {};
    this.TerraAssetInfos = {};
    for (const [asset, value] of Object.entries(ethContractInfos)) {
      const info = terraAssetInfos[asset];
      if (info === undefined) {
        continue;
      }

      if (
        (info.denom === undefined && info.contract_address === undefined) ||
        (info.denom !== undefined && info.contract_address !== undefined)
      ) {
        throw 'Must provide one of denom and contract_address';
      }

      const contract = new this.Web3.eth.Contract(
        WrappedTokenAbi,
        value.contract_address
      );

      this.EthContracts[asset] = contract;
      this.TerraAssetInfos[asset] = info;
    }
  }

  async load(lastHeight: number): Promise<[number, MonitoringData[]]> {
    const latestHeight =
      (await this.Web3.eth.getBlockNumber()) - ETH_BLOCK_CONFIRMATION;

    // skip no new blocks generated
    if (lastHeight >= latestHeight) {
      return [latestHeight, []];
    }

    // If initial state, we start sync from latest height
    const fromBlock = lastHeight === 0 ? latestHeight : lastHeight + 1;
    const toBlock = Math.min(fromBlock + ETH_BLOCK_LOAD_UNIT, latestHeight);
    const promises: Promise<MonitoringData[]>[] = [];

    for (const [asset, contract] of Object.entries(this.EthContracts)) {
      promises.push(
        this.getMonitoringDatas(contract, fromBlock, toBlock, asset)
      );
    }

    const monitoringDatas = (await Promise.all(promises)).flat();

    return [toBlock, monitoringDatas];
  }

  async getMonitoringDatas(
    contract: Contract,
    fromBlock: number,
    toBlock: number,
    asset: string
  ): Promise<MonitoringData[]> {
    const events = await getPastEvents(contract, fromBlock, toBlock, MAX_RETRY);
    const monitoringDatas: MonitoringData[] = events.map((event) => {
      const requested = new BigNumber(event.returnValues['amount']);
      const fee = requested.multipliedBy(FEE_RATE);
      const amount = requested.minus(fee);

      const info = this.TerraAssetInfos[asset];
      return {
        blockNumber: event.blockNumber,
        txHash: event.transactionHash,
        sender: event.returnValues['_sender'],
        to: bech32.encode(
          'terra',
          bech32.toWords(hexToBytes(event.returnValues['_to'].slice(0, 42)))
        ),
        requested: requested.toFixed(0),
        amount: amount.toFixed(0),
        fee: fee.toFixed(0),
        asset,
        terraAssetInfo: info,
      };
    });

    return monitoringDatas;
  }
}

async function getPastEvents(
  contract: Contract,
  fromBlock: number,
  toBlock: number,
  retry: number
): Promise<EventData[]> {
  try {
    const events = await contract.getPastEvents('Burn', {
      fromBlock,
      toBlock,
    });

    return events;
  } catch (err) {
    // query returned more than 10000 results error occurs sometime in
    // Ropsten network even though it is impossible to have more than
    // 10000 results
    if (
      retry > 0 &&
      (err.message ===
        'Returned error: query returned more than 10000 results' ||
        err.message === 'Invalid JSON RPC response: "invalid project id\n"')
    ) {
      console.error('infura errors happened. retry getPastEvents');

      await sleep(500);
      return getPastEvents(contract, fromBlock, toBlock, retry - 1);
    }

    throw err;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type TerraAssetInfo = {
  contract_address?: string;
  denom?: string;
};

export type MonitoringData = {
  blockNumber: number;
  txHash: string;
  sender: string;
  to: string;
  requested: string;
  amount: string;
  fee: string;
  asset: string;

  // terra side data for relayer
  terraAssetInfo: TerraAssetInfo;
};
