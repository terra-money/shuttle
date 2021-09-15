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

  EthContracts: {
    [asset: string]: { contract: Contract; vault_address?: string };
  };
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

    this.EthContracts = {};
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

      if (info.denom !== undefined && info.is_eth_asset) {
        throw new Error('Native asset is not eth asset');
      }

      let contract: Contract;
      let vault_address: string | undefined;
      if (value.token_address) {
        vault_address = value.contract_address;
        contract = new this.Web3.eth.Contract(
          WrappedTokenAbi,
          value.token_address
        );
      } else {
        contract = new this.Web3.eth.Contract(
          WrappedTokenAbi,
          value.contract_address
        );
      }

      this.EthContracts[asset] = { contract, vault_address };
      this.TerraAssetInfos[asset] = info;
    }
  }

  isEthAsset(asset: string): boolean {
    return this.TerraAssetInfos[asset].is_eth_asset ? true : false;
  }

  async getTotalSupplies(): Promise<[string, BigNumber][]> {
    const promises: [string, BigNumber][] = [];
    for (const [asset, { contract, vault_address }] of Object.entries(
      this.EthContracts
    )) {
      promises.push([
        asset,
        new BigNumber(await getSupply(MAX_RETRY, contract, vault_address)),
      ]);
    }

    return promises;
  }

  async getBalances(): Promise<[string, BigNumber][]> {
    const shuttleAddress = this.Wallet.key.accAddress;
    const balance = await this.LCDClient.bank.balance(shuttleAddress);

    const promises: [string, BigNumber][] = [];
    for (const [asset, info] of Object.entries(this.TerraAssetInfos)) {
      let amount: BigNumber;

      if (info.contract_address !== undefined) {
        const contract_address = info.contract_address as string;

        if (info.is_eth_asset) {
          const res: TokenInfoResponse =
            await this.LCDClient.wasm.contractQuery(contract_address, {
              token_info: {},
            });

          amount = new BigNumber(res.total_supply);
        } else {
          const res: BalanceResponse = await this.LCDClient.wasm.contractQuery(
            contract_address,
            { balance: { address: shuttleAddress } }
          );

          amount = new BigNumber(res.balance);
        }
      } else if (info.denom !== undefined) {
        const denom = info.denom as string;
        amount = new BigNumber(
          (balance.get(denom) || new Coin(info.denom, 0)).amount.toString()
        );
      } else {
        throw new Error(`not supported ${asset}`);
      }

      promises.push([asset, amount]);
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
      } else if (info.contract_address && !info.is_eth_asset) {
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
      } else if (info.contract_address && info.is_eth_asset) {
        const contract_address = info.contract_address;

        msgs.push(
          new MsgExecuteContract(
            fromAddr,
            contract_address,
            {
              mint: {
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
  retry: number,
  contract: Contract,
  vault_address?: string
): Promise<BigNumber> {
  let method: any;
  if (vault_address) {
    method = contract.methods.balanceOf(vault_address);
  } else {
    method = contract.methods.totalSupply();
  }

  return method.call().catch(async (err: any) => {
    if (
      retry > 0 &&
      (err.message.includes('invalid project id') ||
        err.message.includes('request failed or timed out') ||
        err.message.includes('Invalid JSON RPC response'))
    ) {
      console.error('infura errors happened. retry getSupply');

      await BlueBird.delay(500);
      return getSupply(retry - 1, contract, vault_address);
    }

    throw err;
  });
}

type TerraAssetInfo = {
  is_eth_asset?: boolean;
  contract_address?: string;
  denom?: string;
};

type BalanceResponse = {
  balance: string;
};

type TokenInfoResponse = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
};
