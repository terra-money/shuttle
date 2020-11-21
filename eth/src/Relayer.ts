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

class Relayer {
  Wallet: Wallet;
  LCDClient: LCDClient;

  constructor() {
    // Register terra chain infos
    this.LCDClient = new LCDClient({
      URL: process.env.TERRA_URL || 'http://localhost:1317',
      chainID: process.env.TERRA_CHAIN_ID || 'localterra',
      gasPrices: process.env.TERRA_GAS_PRICE || '0.00506uluna',
      gasAdjustment: 1.2
    });

    this.Wallet = new Wallet(
      this.LCDClient,
      new MnemonicKey({ mnemonic: process.env.DEV_MNEMONIC })
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
        if (AccAddress.validate(toAddr)) {
          toAddr =
            process.env.TERRA_DONATION ||
            'terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6';
        }

        // 18 decimal to 6 decimal
        if (data.amount.length < 12) return msgs;
        const amount = data.amount.slice(0, data.amount.length - 12);

        if (data.is_native) {
          const denom = data.meta_data;

          msgs.push(new MsgSend(fromAddr, toAddr, [new Coin(denom, amount)]));
        } else {
          const contract_address = data.meta_data;

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

    const tx = await this.Wallet.createAndSignTx({
      msgs,
      gasPrices: process.env.TERRA_GAS_PRICE,
      gasAdjustment: process.env.TERRA_GAS_ADJUSTMENT
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
