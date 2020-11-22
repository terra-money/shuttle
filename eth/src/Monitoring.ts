import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';

const LOAD_UNIT = parseInt(process.env.ETH_LOAD_UNIT || '10');
const BLOCK_CONFIRMATION = parseInt(process.env.ETH_BLOCK_CONFIRMATION || '7');

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID || 'ropsten';
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID || 'tequila-0004';

const ETH_URL = process.env.ETH_URL || 'ws://localhost:8545';

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
      if (info.is_native && !info.denom)
        throw 'Must provide denom for the native asset';
      else if (!info.is_native && !info.contract_address)
        throw 'Must provide contract address for the token asset';

      this.TerraAssetInfos[asset] = info;
    }
  }

  async load(lastHeight: number): Promise<[number, Array<MonitoringData>]> {
    const latestHeight =
      (await this.Web3.eth.getBlockNumber()) - BLOCK_CONFIRMATION;

    // skip when there is no new blocks
    if (latestHeight == lastHeight) return [latestHeight, []];

    const fromBlock = lastHeight + 1;
    const toBlock = Math.min(fromBlock + LOAD_UNIT, latestHeight);

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
  is_native: boolean;
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
