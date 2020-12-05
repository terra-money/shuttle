import Web3 from 'web3';
import {
  LCDClient,
  AccAddress,
  MsgSend,
  MsgExecuteContract,
  TxInfo
} from '@terra-money/terra.js';
import { Contract } from 'web3-eth-contract';
import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';
import HDWalletProvider from '@truffle/hdwallet-provider';
import BigNumber from 'bignumber.js';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const FEE_RATE = process.env.FEE_RATE as string;
const ETH_MNEMONIC = process.env.ETH_MNEMONIC as string;

const TERRA_TRACKING_ADDR = process.env.TERRA_TRACKING_ADDR as string;
const TERRA_TXS_LOAD_UNIT = parseInt(process.env.TERRA_TXS_LOAD_UNIT as string);
const TERRA_BLOCK_CONFIRMATION = parseInt(
  process.env.TERRA_BLOCK_CONFIRMATION as string
);

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;

const ETH_URL = process.env.ETH_URL as string;
const TERRA_URL = process.env.TERRA_URL as string;

export class Monitoring {
  LCDClient: LCDClient;
  TerraTrackingAddress: AccAddress;

  EthContracts: { [asset: string]: Contract };
  TerraAssetMapping: {
    [denom_or_address: string]: string;
  };

  constructor() {
    const web3 = new Web3();
    const provider = new HDWalletProvider({
      mnemonic: ETH_MNEMONIC,
      providerOrUrl: ETH_URL
    });

    provider.engine.stop();
    web3.setProvider(provider);
    const fromAddress = provider.getAddress();

    this.TerraTrackingAddress = TERRA_TRACKING_ADDR;
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID
    });

    const ethContractInfos = EthContractInfos[ETH_CHAIN_ID];
    const terraAssetInfos = TerraAssetInfos[TERRA_CHAIN_ID];

    this.EthContracts = {};
    this.TerraAssetMapping = {};

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

      const contract = new web3.eth.Contract(
        WrappedTokenAbi,
        value.contract_address,
        { from: fromAddress }
      );

      this.EthContracts[asset] = contract;
      this.TerraAssetMapping[info.denom || info.contract_address || ''] = asset;
    }
  }

  // load and process a single block
  async load(lastHeight: number): Promise<[number, MonitoringData[]]> {
    const latestHeight =
      parseInt(
        (await this.LCDClient.tendermint.blockInfo()).block.header.height
      ) - TERRA_BLOCK_CONFIRMATION;

    // skip no new blocks generated
    if (lastHeight >= latestHeight) return [latestHeight, []];

    // If initial state, we start sync from latest height
    const targetHeight = lastHeight === 0 ? latestHeight : lastHeight + 1;
    const limit = TERRA_TXS_LOAD_UNIT;
    const monitoringDatas: MonitoringData[] = [];

    let page = 1;
    let totalPage = 1;
    do {
      const txResult = await this.LCDClient.tx.search({
        'tx.height': targetHeight,
        page,
        limit
      });

      monitoringDatas.push(
        ...monitoringDatas.concat.apply(
          [],
          txResult.txs.map(this.parseTx.bind(this))
        )
      );

      totalPage = txResult.page_total;
    } while (page++ < totalPage);

    return [targetHeight, monitoringDatas];
  }

  parseTx(tx: TxInfo): MonitoringData[] {
    const monitoringDatas: MonitoringData[] = [];

    // Skip when tx is failed
    if (tx.code !== undefined) {
      return monitoringDatas;
    }

    // Only cares first message
    const msg = tx.tx.msg[0];
    if (msg === undefined) {
      return monitoringDatas;
    }

    const msgData = msg.toData();
    const msgType = msgData.type;

    if (msgType === 'bank/MsgSend') {
      const data: MsgSend.Data = msgData as MsgSend.Data;

      // Check a recipient is TerraTrackingAddress
      if (data.value.to_address === this.TerraTrackingAddress) {
        const blockNumber = tx.height;
        const txHash = tx.txhash;
        const sender = data.value.from_address;
        const to = tx.tx.memo;

        data.value.amount.forEach((coin) => {
          if (coin.denom in this.TerraAssetMapping) {
            const asset = this.TerraAssetMapping[coin.denom];
            const requested = new BigNumber(coin.amount);
            const fee = requested.multipliedBy(FEE_RATE);
            const amount = requested.minus(fee);

            monitoringDatas.push({
              blockNumber,
              txHash,
              sender,
              to,
              requested: requested.toFixed(0),
              amount: amount.toFixed(0),
              fee: fee.toFixed(0),
              asset,
              contract: this.EthContracts[asset]
            });
          }
        });
      }
    } else if (msgType === 'wasm/MsgExecuteContract') {
      const data: MsgExecuteContract.Data = msgData as MsgExecuteContract.Data;

      if (data.value.contract in this.TerraAssetMapping) {
        const asset = this.TerraAssetMapping[data.value.contract];
        const executeMsg = JSON.parse(
          Buffer.from(data.value.execute_msg, 'base64').toString()
        );

        // Check the msg is 'transfer'
        if ('transfer' in executeMsg) {
          // Check the recipient is TerraTrackingAddress
          const transferMsg = executeMsg['transfer'];
          const recipient = transferMsg['recipient'];

          if (recipient === this.TerraTrackingAddress) {
            const blockNumber = tx.height;
            const txHash = tx.txhash;
            const sender = data.value.sender;
            const to = tx.tx.memo;

            const requested = new BigNumber(transferMsg['amount']);
            const fee = requested.multipliedBy(FEE_RATE);
            const amount = requested.minus(fee);

            monitoringDatas.push({
              blockNumber,
              txHash,
              sender,
              to,
              requested: requested.toFixed(0),
              amount: amount.toFixed(0),
              fee: fee.toFixed(0),
              asset,
              contract: this.EthContracts[asset]
            });
          }
        }
      }
    }

    return monitoringDatas;
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

  requested: string;
  amount: string;
  fee: string;
  asset: string;

  // eth side data for relayer
  contract: Contract;
};
