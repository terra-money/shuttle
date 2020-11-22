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
import bech32 from 'bech32';
import { hexToBytes } from 'web3-utils';

const DEV_MNEMONIC = process.env.DEV_MNEMONIC;

const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID || 'tequila-0004';
const TERRA_URL = process.env.TERRA_URL || 'http://tequila-lcd.terra.dev';
const TERRA_GAS_PRICE = process.env.TERRA_GAS_PRICE || '0.00506uluna';
const TERRA_GAS_ADJUSTMENT = process.env.TERRA_GAS_ADJUSTMENT;
const TERRA_DONATION =
  process.env.TERRA_DONATION || 'terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6';

class Relayer {
  Wallet: Wallet;
  LCDClient: LCDClient;

  constructor() {
    // Register terra chain infos
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID,
      gasPrices: TERRA_GAS_PRICE,
      gasAdjustment: TERRA_GAS_ADJUSTMENT
    });

    this.Wallet = new Wallet(
      this.LCDClient,
      new MnemonicKey({ mnemonic: DEV_MNEMONIC })
    );
  }

  async relay(monitoringDatas: MonitoringData[]): Promise<string> {
    const msgs: Array<Msg> = monitoringDatas.reduce(
      (msgs: Array<Msg>, data: MonitoringData) => {
        const fromAddr = this.Wallet.key.accAddress;
        let toAddr = bech32.encode(
          'terra',
          bech32.toWords(hexToBytes(data.to.slice(0, 42)))
        );

        // If the given address not proper address,
        // relayer send the funds to donation address
        if (AccAddress.validate(toAddr)) {
          toAddr = TERRA_DONATION;
        }

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

    const tx = await this.Wallet.createAndSignTx({
      msgs
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
