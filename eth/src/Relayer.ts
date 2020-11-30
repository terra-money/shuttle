import {
  LCDClient,
  MsgExecuteContract,
  MsgSend,
  Msg,
  Wallet,
  MnemonicKey,
  AccAddress,
  isTxError,
  Coin
} from '@terra-money/terra.js';
import { MonitoringData } from 'Monitoring';

const TERRA_MNEMONIC = process.env.TERRA_MNEMONIC as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;
const TERRA_URL = process.env.TERRA_URL as string;
const TERRA_GAS_PRICE = process.env.TERRA_GAS_PRICE as string;
const TERRA_GAS_ADJUSTMENT = process.env.TERRA_GAS_ADJUSTMENT as string;
const TERRA_DONATION = process.env.TERRA_DONATION as string;

class Relayer {
  Wallet: Wallet;
  LCDClient: LCDClient;

  sequenceNumber: number;

  constructor() {
    // Register terra chain infos
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID,
      gasPrices: TERRA_GAS_PRICE,
      gasAdjustment: TERRA_GAS_ADJUSTMENT
    });

    this.sequenceNumber = 0;
    this.Wallet = new Wallet(
      this.LCDClient,
      new MnemonicKey({ mnemonic: TERRA_MNEMONIC })
    );
  }

  async adjustSequenceNumber() {
    let sequenceNumber = await this.Wallet.sequence();
    this.sequenceNumber =
      this.sequenceNumber > sequenceNumber
        ? this.sequenceNumber
        : sequenceNumber;
  }

  async relay(monitoringDatas: MonitoringData[]): Promise<string> {
    const msgs: Array<Msg> = monitoringDatas.reduce(
      (msgs: Array<Msg>, data: MonitoringData) => {
        const fromAddr = this.Wallet.key.accAddress;

        // If the given `to` address not proper address,
        // relayer send the funds to donation address
        const toAddr = AccAddress.validate(data.to) ? data.to : TERRA_DONATION;

        // 18 decimal to 6 decimal
        if (data.amount.length < 12) return msgs;

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
                  amount: amount
                }
              },
              []
            )
          );
        }

        return msgs;
      },
      []
    );

    if (msgs.length === 0) return '';

    // Adjust sequence number between local and chain
    await this.adjustSequenceNumber();

    const tx = await this.Wallet.createAndSignTx({
      msgs,
      sequence: this.sequenceNumber++
    });

    const result = await this.LCDClient.tx.broadcastSync(tx);
    if (isTxError(result)) {
      throw new Error(
        `Error while executing: ${result.code} - ${result.raw_log}`
      );
    }

    return result.txhash;
  }
}

export = Relayer;
