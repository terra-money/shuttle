import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import EthContractInfos from './config/EthContractInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';

const LOAD_UNIT = parseInt(process.env.ETH_LOAD_UNIT || '10');
const BLOCK_CONFIRMATION = parseInt(process.env.ETH_BLOCK_CONFIRMATION || '7');

export class Monitoring {
  Web3: Web3;

  Network: 'ropsten' | 'mainnet';
  EthContracts: Array<Contract>;
  EthContractInfos: {
    [contract_address: string]: {
      meta_data: string;
      is_native: boolean;
    };
  };

  constructor() {
    if (
      process.env.ETH_CHAIN_ID !== 'ropsten' &&
      process.env.ETH_CHAIN_ID !== 'mainnet'
    ) {
      console.error('Must provide one of [ropsten, mainnet]');
      process.exit(-1);
    }

    // Register eth chain infos
    this.Web3 = new Web3(process.env.ETH_URL || 'ws://localhost:8545');
    this.Network = process.env.ETH_CHAIN_ID;

    this.EthContracts = [];
    this.EthContractInfos = {};
    Object.values(EthContractInfos[this.Network]).forEach((info) => {
      const contract = new this.Web3.eth.Contract(
        WrappedTokenAbi,
        info.contract_address
      );

      this.EthContracts.push(contract);
      this.EthContractInfos[info.contract_address] = {
        meta_data: info.meta_data,
        is_native: info.is_native
      };
    });
  }

  async load(lastHeight: number): Promise<[number, Array<MonitoringData>]> {
    const latestHeight = await this.Web3.eth.getBlockNumber() - BLOCK_CONFIRMATION;

    // skip when there is no new blocks
    if (latestHeight == lastHeight) return [latestHeight, []];

    const fromBlock = lastHeight + 1;
    const toBlock = Math.min(fromBlock + LOAD_UNIT, latestHeight);

    const monitoringDatas: Array<MonitoringData> = [];
    for (let i = 0; i < this.EthContracts.length; i++) {
      const contract = this.EthContracts[i];
      const events = await contract.getPastEvents('Burn', {
        fromBlock,
        toBlock
      });

      monitoringDatas.push(
        ...events.map((event) => {
          const info = this.EthContractInfos[event.address];
          return {
            blockNumber: event.blockNumber,
            txHash: event.transactionHash,
            sender: event.returnValues['_sender'],
            to: event.returnValues['_to'],
            amount: event.returnValues['amount'],
            meta_data: info.meta_data,
            is_native: info.is_native
          };
        })
      );
    }

    return [toBlock, monitoringDatas];
  }
}

export type MonitoringData = {
  blockNumber: number;
  txHash: string;
  sender: string;
  to: string;
  amount: string;
  // terra side data for relayer
  meta_data: string;
  is_native: boolean;
};
