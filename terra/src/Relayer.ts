import { MonitoringData } from 'Monitoring';
import Web3 from 'web3';
import { TransactionConfig, Transaction } from 'web3-core';
import WrappedTokenAbi from './config/WrappedTokenAbi';
import HDWalletProvider from '@truffle/hdwallet-provider';

const ETH_MNEMONIC = process.env.ETH_MNEMONIC as string;
const ETH_URL = process.env.ETH_URL as string;
const ETH_DONATION = process.env.ETH_DONATION as string;

export interface RelayData {
  transactionConfig: TransactionConfig;
  signedTxData: string;
  txHash: string;
  createdAt: number;
}

export class Relayer {
  web3: Web3;
  fromAddress: string;

  constructor() {
    const web3 = new Web3();
    const provider = new HDWalletProvider({
      mnemonic: ETH_MNEMONIC,
      providerOrUrl: ETH_URL,
    });

    provider.engine.stop();
    web3.setProvider(provider);

    this.fromAddress = provider.getAddress();
    this.web3 = web3;
  }

  loadNonce(): Promise<number> {
    return this.web3.eth.getTransactionCount(this.fromAddress, 'pending');
  }

  async build(
    monitoringData: MonitoringData,
    nonce: number
  ): Promise<RelayData> {
    // Check the address is valid
    let recipient = monitoringData.to;
    if (!Web3.utils.isAddress(monitoringData.to)) {
      recipient = ETH_DONATION;
    }

    const contract = new this.web3.eth.Contract(WrappedTokenAbi);

    const contractAddr = monitoringData.contractAddr;
    const data = contract.methods
      .mint(recipient, monitoringData.amount + '000000000000')
      .encodeABI();

    const transactionConfig: TransactionConfig = {
      from: this.fromAddress,
      to: contractAddr,
      value: '0',
      gas: 100000,
      gasPrice: '75000000000',
      data,
      nonce,
    };

    const signedTransaction = await this.web3.eth.signTransaction(
      transactionConfig
    );
    const txHash = this.web3.utils.sha3(signedTransaction.raw) as string;

    return {
      transactionConfig,
      signedTxData: signedTransaction.raw,
      txHash,
      createdAt: new Date().getTime(),
    };
  }

  relay(relayData: RelayData): Promise<string> {
    return new Promise((resolve, reject) => {
      this.web3.eth
        .sendSignedTransaction(relayData.signedTxData)
        .on('transactionHash', resolve)
        .on('error', reject);
    });
  }

  getTransaction(txHash: string): Promise<Transaction> {
    return this.web3.eth.getTransaction(txHash);
  }
}
