import {
  LCDClient,
  MsgExecuteContract,
  MsgSend,
  Msg,
  Wallet,
  MnemonicKey,
  AccAddress,
  isTxError,
  Coin,
  StdTx,
  TxInfo,
} from '@terra-money/terra.js';
import { MonitoringData } from 'Monitoring';

const TERRA_MNEMONIC = process.env.TERRA_MNEMONIC as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;
const TERRA_URL = process.env.TERRA_URL as string;
const TERRA_GAS_PRICE = process.env.TERRA_GAS_PRICE as string;
const TERRA_GAS_ADJUSTMENT = process.env.TERRA_GAS_ADJUSTMENT as string;
const TERRA_DONATION = process.env.TERRA_DONATION as string;

export interface RelayData {
  tx: StdTx;
  txHash: string;
  createdAt: number;
}

export class Relayer {
  Wallet: Wallet;
  LCDClient: LCDClient;

  constructor() {
    // Register terra chain infos
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID,
      gasPrices: TERRA_GAS_PRICE,
      gasAdjustment: TERRA_GAS_ADJUSTMENT,
    });

    this.Wallet = new Wallet(
      this.LCDClient,
      new MnemonicKey({ mnemonic: TERRA_MNEMONIC })
    );
  }

  loadSequence(): Promise<number> {
    return this.Wallet.sequence();
  }

  async build(
    monitoringDatas: MonitoringData[],
    sequence: number
  ): Promise<RelayData | null> {
    const msgs: Msg[] = monitoringDatas.reduce(
      (msgs: Msg[], data: MonitoringData) => {
        const fromAddr = this.Wallet.key.accAddress;

        // If the given `to` address not proper address,
        // relayer send the funds to donation address
        const toAddr = AccAddress.validate(data.to) ? data.to : TERRA_DONATION;

        // 18 decimal to 6 decimal
        // it must bigger than 1,000,000,000,000
        if (data.amount.length < 13) {
          return msgs;
        }

        const amount = data.amount.slice(0, data.amount.length - 12);
        const info = data.terraAssetInfo;

        if (info.denom) {
          const denom = info.denom;

          msgs.push(new MsgSend(fromAddr, toAddr, [new Coin(denom, amount)]));
        } else if (info.contract_address) {
          const contract_address = info.contract_address;

          msgs.push(
            new MsgExecuteContract(
              fromAddr,
              contract_address,
              {
                transfer: {
                  recipient: toAddr,
                  amount: amount,
                },
              },
              []
            )
          );
        }

        return msgs;
      },
      []
    );

    if (msgs.length === 0) {
      return null;
    }

    const tx = await this.Wallet.createAndSignTx({
      msgs,
      sequence,
    });

    const txHash = await this.LCDClient.tx.hash(tx);

    return {
      tx,
      txHash,
      createdAt: new Date().getTime(),
    };
  }

  async relay(tx: StdTx): Promise<void> {
    const result = await this.LCDClient.tx.broadcastSync(tx);

    if (isTxError(result)) {
      throw new Error(
        `Error while executing: ${result.code} - ${result.raw_log}`
      );
    }
  }

  async getTransaction(txHash: string): Promise<TxInfo | null> {
    return await this.LCDClient.tx.txInfo(txHash).catch(() => {
      return null; // ignore not found error
    });
  }
}
