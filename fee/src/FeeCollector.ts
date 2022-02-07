import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import BlueBird from 'bluebird';
import {
  LCDClient,
  Wallet,
  MnemonicKey,
  Coin,
  AccAddress,
  Msg,
  MsgSend,
  MsgExecuteContract,
  isTxError,
  Int,
} from '@terra-money/terra.js';
import prompts from 'prompts';

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';

const ETH_URL = process.env.ETH_URL as string;
const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;

const TERRA_MNEMONIC = process.env.TERRA_MNEMONIC as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;
const TERRA_URL = process.env.TERRA_URL as string;
const TERRA_GAS_PRICE = process.env.TERRA_GAS_PRICE as string;
const TERRA_GAS_ADJUSTMENT = process.env.TERRA_GAS_ADJUSTMENT as string;
const TERRA_FEE_COLLECTOR = process.env.TERRA_FEE_COLLECTOR as string;

const MAX_RETRY = 5;
export class FeeCollector {
  Web3: Web3;
  Wallet: Wallet;
  LCDClient: LCDClient;
  FeeCollectorAddr: AccAddress;

  EthContractInfos: { [asset: string]: EthereumContractInfo };
  TerraAssetInfos: {
    [asset: string]: TerraAssetInfo;
  };

  constructor() {
    if (!AccAddress.validate(TERRA_FEE_COLLECTOR)) {
      throw 'invalid fee collector address';
    }

    this.Web3 = new Web3(ETH_URL);
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID,
      gasPrices: TERRA_GAS_PRICE,
      gasAdjustment: TERRA_GAS_ADJUSTMENT,
    });

    this.FeeCollectorAddr = TERRA_FEE_COLLECTOR;
    this.Wallet = new Wallet(
      this.LCDClient,
      new MnemonicKey({ mnemonic: TERRA_MNEMONIC })
    );

    const ethContractInfos = EthContractInfos[ETH_CHAIN_ID];
    const terraAssetInfos = TerraAssetInfos[TERRA_CHAIN_ID];

    this.EthContractInfos = {};
    this.TerraAssetInfos = {};

    for (const [asset, value] of Object.entries(ethContractInfos)) {
      if (asset === 'minter') {
        continue;
      }

      const info = terraAssetInfos[asset];
      if (info === undefined) {
        continue;
      }

      if (
        (info.denom === undefined && info.contract_address === undefined) ||
        (info.denom !== undefined && info.contract_address !== undefined)
      ) {
        throw new Error('Must provide one of denom and contract_address');
      }

      const contract = new this.Web3.eth.Contract(
        WrappedTokenAbi,
        value.contract_address
      );

      this.EthContractInfos[asset] = {
        contract,
        migration_amount: new BigNumber(value.migration_amount || 0),
      };
      this.TerraAssetInfos[asset] = info;
    }
  }

  async getTotalSupplies(): Promise<[string, BigNumber][]> {
    const promises: [string, BigNumber][] = [];
    for (const [asset, contractInfo] of Object.entries(this.EthContractInfos)) {
      promises.push([
        asset,
        new BigNumber(await getSupply(contractInfo.contract, MAX_RETRY)).minus(
          contractInfo.migration_amount
        ),
      ]);
    }

    return promises;
  }

  async getBalances(): Promise<[string, BigNumber][]> {
    const shuttleAddress = this.Wallet.key.accAddress;
    const [balance, _] = await this.LCDClient.bank.balance(shuttleAddress);

    const promises: [string, BigNumber][] = [];
    for (const [asset, info] of Object.entries(this.TerraAssetInfos)) {
      if (info.contract_address !== undefined) {
        const contract_address = info.contract_address as string;
        const res: BalanceResponse = await this.LCDClient.wasm.contractQuery(
          contract_address,
          { balance: { address: shuttleAddress } }
        );

        promises.push([asset, new BigNumber(res.balance)]);
      } else if (info.denom !== undefined) {
        const denom = info.denom as string;
        const amount = (balance.get(denom) || new Coin(info.denom, 0)).amount;

        promises.push([asset, new BigNumber(amount.toString())]);
      }
    }

    return promises;
  }

  async transfer(collectedFees: [string, BigNumber][]): Promise<string | null> {
    const fromAddr = this.Wallet.key.accAddress;
    const toAddr = this.FeeCollectorAddr;

    const msgs: Msg[] = [];
    const taxRate = await this.LCDClient.treasury.taxRate();
    for (const [asset, amount] of collectedFees) {
      const info = this.TerraAssetInfos[asset];
      const amountStr = amount.toFixed(0);

      if (info.denom) {
        const denom = info.denom;
        const beforeAmount = new Int(amountStr);
        const tmpTax = new Int(beforeAmount.mul(taxRate));
        const taxCap = new Int(
          (await this.LCDClient.treasury.taxCap(denom)).amount
        );

        const taxAmount = tmpTax.lt(taxCap) ? tmpTax : taxCap;
        const afterAmount = beforeAmount.sub(taxAmount);

        msgs.push(
          new MsgSend(fromAddr, toAddr, [new Coin(denom, afterAmount)])
        );
      } else if (info.contract_address) {
        const contract_address = info.contract_address;

        msgs.push(
          new MsgExecuteContract(
            fromAddr,
            contract_address,
            {
              transfer: {
                recipient: toAddr,
                amount: amountStr,
              },
            },
            []
          )
        );
      }
    }

    if (msgs.length === 0) {
      return null;
    }

    const response = await prompts({
      type: 'text',
      name: 'value',
      message: `${JSON.stringify(msgs)}\n Broadcast [Y/N]?`,
    });

    if (response['value'] !== 'Y') {
      return null;
    }

    const tx = await this.Wallet.createAndSignTx({
      msgs,
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

async function getSupply(
  contract: Contract,
  retry: number
): Promise<BigNumber> {
  return contract.methods
    .totalSupply()
    .call()
    .catch(async (err: any) => {
      if (
        retry > 0 &&
        (err.message.includes('invalid project id') ||
          err.message.includes('request failed or timed out') ||
          err.message.includes('Invalid JSON RPC response'))
      ) {
        console.error('infura errors happened. retry getSupply');

        await BlueBird.delay(500);
        return getSupply(contract, retry - 1);
      }

      throw err;
    });
}

type EthereumContractInfo = {
  contract: Contract;
  migration_amount: BigNumber;
};

type TerraAssetInfo = {
  contract_address?: string;
  denom?: string;
};

type BalanceResponse = {
  balance: string;
};
