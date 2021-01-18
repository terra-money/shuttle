import { MonitoringData } from 'Monitoring';
import Web3 from 'web3';
import { TransactionConfig, Transaction } from 'web3-core';
import WrappedTokenAbi from './config/WrappedTokenAbi';
import HDWalletProvider from '@truffle/hdwallet-provider';
import BigNumber from 'bignumber.js';

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

    this.web3 = web3;
    this.fromAddress = provider.getAddress();
  }

  loadNonce(): Promise<number> {
    return this.web3.eth.getTransactionCount(this.fromAddress, 'pending');
  }

  async build(
    monitoringData: MonitoringData,
    nonce: number,
    gasPrice: string
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
      gasPrice,
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

  async increaseGasPrice(
    relayData: RelayData,
    targetGasPrice: BigNumber
  ): Promise<RelayData> {
    if (
      targetGasPrice >
      new BigNumber(
        relayData.transactionConfig.gasPrice as string
      ).multipliedBy(1.1)
    ) {
      relayData.transactionConfig.gasPrice = targetGasPrice.toFixed(0);

      const signedTransaction = await this.web3.eth.signTransaction(
        relayData.transactionConfig
      );

      relayData.txHash = this.web3.utils.sha3(signedTransaction.raw) as string;
      relayData.signedTxData = signedTransaction.raw;
      relayData.createdAt = new Date().getTime();
    }

    return relayData;
  }

  relay(relayData: RelayData): Promise<string> {
    return new Promise((resolve, reject) => {
      this.web3.eth
        .sendSignedTransaction(relayData.signedTxData)
        .on('transactionHash', resolve)
        .on('error', reject);
    });
  }

  getGasPrice(): Promise<string> {
    return this.web3.eth.getGasPrice();
  }

  getTransaction(txHash: string): Promise<Transaction> {
    return this.web3.eth.getTransaction(txHash);
  }
}
