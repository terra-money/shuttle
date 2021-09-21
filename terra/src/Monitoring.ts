import {
  LCDClient,
  AccAddress,
  MsgSend,
  MsgExecuteContract,
  TxInfo,
  TxSearchResult,
} from '@terra-money/terra.js';
import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import BigNumber from 'bignumber.js';
import Oracle from './Oracle';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const FEE_RATE = new BigNumber(process.env.FEE_RATE as string);
const FEE_MIN_AMOUNT = new BigNumber(process.env.FEE_MIN_AMOUNT as string);

const TERRA_TRACKING_ADDR = process.env.TERRA_TRACKING_ADDR as string;
const TERRA_TXS_LOAD_UNIT = parseInt(process.env.TERRA_TXS_LOAD_UNIT as string);
const TERRA_BLOCK_CONFIRMATION = parseInt(
  process.env.TERRA_BLOCK_CONFIRMATION as string
);

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;
const TERRA_URL = process.env.TERRA_URL as string;

export class Monitoring {
  oracle: Oracle;
  LCDClient: LCDClient;
  TerraTrackingAddress: AccAddress;

  minterAddress?: string;
  EthContracts: { [asset: string]: string };
  TerraAssetMapping: {
    [denom_or_address: string]: string;
  };
  TerraAssetInfos: {
    [asset: string]: TerraAssetInfo;
  };

  constructor() {
    this.TerraTrackingAddress = TERRA_TRACKING_ADDR;
    this.oracle = new Oracle();
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID,
    });

    const ethContractInfos = EthContractInfos[ETH_CHAIN_ID];
    this.TerraAssetInfos = TerraAssetInfos[TERRA_CHAIN_ID];

    this.EthContracts = {};
    this.TerraAssetMapping = {};

    for (const [asset, value] of Object.entries(ethContractInfos)) {
      if (asset === 'minter') {
        // set minter address
        this.minterAddress = value.contract_address;

        continue;
      }

      const info = this.TerraAssetInfos[asset];
      if (info === undefined) {
        continue;
      }

      if (
        (info.denom === undefined && info.contract_address === undefined) ||
        (info.denom !== undefined && info.contract_address !== undefined)
      ) {
        throw new Error('Must provide one of denom and contract_address');
      }

      if (info.denom !== undefined && info.is_eth_asset) {
        throw new Error('Native asset is not eth asset');
      }

      this.EthContracts[asset] = value.contract_address;
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
    if (lastHeight >= latestHeight) {
      return [lastHeight, []];
    }

    // If initial state, we start sync from latest height
    const targetHeight = lastHeight === 0 ? latestHeight : lastHeight + 1;
    const limit = TERRA_TXS_LOAD_UNIT;
    const monitoringDatas: MonitoringData[] = [];

    let offset: string | null = null;
    do {
      const txResult: TxSearchResult = await this.LCDClient.tx.search({
        events: [{ key: 'tx.height', value: targetHeight.toFixed() }],
        'pagination.limit': limit.toFixed(),
        'pagination.offset': offset ?? undefined,
      });

      monitoringDatas.push(
        ...(await Promise.all(txResult.txs.map(this.parseTx.bind(this)))).flat()
      );

      offset = txResult.pagination.next_key;
    } while (offset != null);

    return [targetHeight, monitoringDatas];
  }

  async parseTx(tx: TxInfo): Promise<MonitoringData[]> {
    const monitoringDatas: MonitoringData[] = [];

    // Skip when tx is failed
    if (tx.code !== undefined) {
      return monitoringDatas;
    }

    // Only cares first message
    const msg = tx.tx.body.messages[0];
    if (msg === undefined) {
      return monitoringDatas;
    }

    const msgData = msg.toData();
    const msgType = msgData['@type'];

    if (msgType === '/cosmos.bank.v1beta1.MsgSend') {
      const data: MsgSend.Data = msgData as MsgSend.Data;

      // Check a recipient is TerraTrackingAddress
      if (data.to_address === this.TerraTrackingAddress) {
        const blockNumber = tx.height;
        const txHash = tx.txhash;
        const sender = data.from_address;
        const to = tx.tx.body.memo ?? '';

        for (const coin of data.amount) {
          if (coin.denom in this.TerraAssetMapping) {
            const asset = this.TerraAssetMapping[coin.denom];
            const requested = new BigNumber(coin.amount);

            // Compute fee with minimum fee consideration
            const fee = await this.computeFee(asset, requested);

            // Skip logging or other actions for tiny amount transaction
            if (requested.gt(fee)) {
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
                contractAddr: this.EthContracts[asset],
              });
            }
          }
        }
      }
    } else if (msgType === '/terra.wasm.v1beta1.MsgExecuteContract') {
      const data: MsgExecuteContract.Data = msgData as MsgExecuteContract.Data;

      if (data.contract in this.TerraAssetMapping) {
        const asset = this.TerraAssetMapping[data.contract];
        const info = this.TerraAssetInfos[asset];
        const executeMsg = data.execute_msg as any;

        if (!info.is_eth_asset && 'transfer' in executeMsg) {
          // Check the msg is 'transfer' for terra asset
          const transferMsg = executeMsg['transfer'];
          const recipient = transferMsg['recipient'];

          // Check the recipient is TerraTrackingAddress
          if (recipient === this.TerraTrackingAddress) {
            const blockNumber = tx.height;
            const txHash = tx.txhash;
            const sender = data.sender;
            const to = tx.tx.body.memo ?? '';

            const requested = new BigNumber(transferMsg['amount']);

            // Compute fee with minimum fee consideration
            const fee = await this.computeFee(asset, requested);

            // Skip logging or other actions for tiny amount transaction
            if (requested.gt(fee)) {
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
                contractAddr: this.EthContracts[asset],
              });
            }
          }
        } else if (info.is_eth_asset && 'burn' in executeMsg) {
          // Check the msg is 'burn' for eth asset
          const blockNumber = tx.height;
          const txHash = tx.txhash;
          const sender = data.sender;
          const to = tx.tx.body.memo ?? '';

          const burnMsg = executeMsg['burn'];
          const requested = new BigNumber(burnMsg['amount']);

          // Compute fee with minimum fee consideration
          const fee = await this.computeFee(asset, requested);

          // Skip logging or other actions for tiny amount transaction
          if (requested.gt(fee)) {
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
              contractAddr: this.EthContracts[asset],
            });
          }
        }
      }
    }

    return monitoringDatas;
  }

  async computeFee(asset: string, amount: BigNumber): Promise<BigNumber> {
    if (FEE_MIN_AMOUNT.isZero() && FEE_RATE.isZero()) {
      return new BigNumber(0);
    }

    const price = await this.oracle.getPrice(asset);

    const fee = amount.multipliedBy(FEE_RATE);
    const minFee =
      price == 0 ? new BigNumber(0) : FEE_MIN_AMOUNT.dividedBy(price);

    return fee.lt(minFee) ? minFee : fee;
  }
}

export type TerraAssetInfo = {
  is_eth_asset?: boolean;
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
  contractAddr: string;
};
