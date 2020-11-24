import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';

const ETH_BLOCK_LOAD_UNIT = parseInt(process.env.ETH_BLOCK_LOAD_UNIT as string);
const ETH_BLOCK_CONFIRMATION = parseInt(
  process.env.ETH_BLOCK_CONFIRMATION as string
);

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;

const ETH_URL = process.env.ETH_URL as string;

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
      const contract = new this.Web3.eth.Contract(
        WrappedTokenAbi,
        value.contract_address
      );

      this.EthContracts[asset] = contract;

      // Check terra asset info
      const info = terraAssetInfos[asset];
      if (!info.denom && !info.contract_address)
        throw 'Must provide one of denom and contract_address';

      this.TerraAssetInfos[asset] = info;
    }
  }

  async load(lastHeight: number): Promise<[number, Array<MonitoringData>]> {
    const latestHeight =
      (await this.Web3.eth.getBlockNumber()) - ETH_BLOCK_CONFIRMATION;

    // skip no new blocks generated
    if (lastHeight >= latestHeight) return [latestHeight, []];

    // If initial state, we start sync from latest height
    const fromBlock = lastHeight === 0 ? latestHeight : lastHeight + 1;
    const toBlock = Math.min(fromBlock + ETH_BLOCK_LOAD_UNIT, latestHeight);

    const monitoringDatas: Array<MonitoringData> = [];
    for (const [asset, contract] of Object.entries(this.EthContracts)) {
      const events = await contract.getPastEvents('Burn', {
        fromBlock,
        toBlock
      });

      monitoringDatas.push(
        ...events.map((event) => {
          const info = this.TerraAssetInfos[asset];
          return {
            blockNumber: event.blockNumber,
            txHash: event.transactionHash,
            sender: event.returnValues['_sender'],
            to: event.returnValues['_to'],
            amount: event.returnValues['amount'],
            terraAssetInfo: info
          };
        })
      );
    }

    return [toBlock, monitoringDatas];
  }
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
  amount: string;

  // terra side data for relayer
  terraAssetInfo: TerraAssetInfo;
};
