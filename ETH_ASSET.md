# Ethereum Asset Bridge

ERC20 tokens can be relayed to Terra network only when corresponding vault contracts are deployed.

## Table of Contents

- [Ethereum Asset Bridge](#ethereum-asset-bridge)
  - [Table of Contents](#table-of-contents)
  - [ERC20 Contracts](#erc20-contracts)
  - [ETH Vault Contracts](#eth-vault-contracts)
  - [Terra CW20 Contracts](#terra-cw20-contracts)
  - [Usage Instructions](#usage-instructions)
    - [Terra => Ethereum](#terra--ethereum)
      - [CW20 Tokens](#cw20-tokens)
    - [Ethereum => Terra](#ethereum--terra)


## ERC20 Contracts
| asset | mainnet                                    | ropsten                                    |
| ----- | ------------------------------------------ | ------------------------------------------ |
| vETH  |                                            | 0xc778417E063141139Fce010982780140Aa0cD5Ab |
| bETH  | 0x707F9118e33A9B8998beA41dd0d46f38bb963FC8 | 0xA60100d5e12E9F83c1B04997314cf11685A618fF |

## ETH Vault Contracts

| asset | mainnet                                    | ropsten                                    |
| ----- | ------------------------------------------ | ------------------------------------------ |
| vETH  |                                            | 0xB9C9dC335F7059446f0a33c40eE6743b44973d45 |
| bETH  | 0xF9dcf31EE6EB94AB732A43c2FbA1dC6179c98965 | 0xDD7e8f8047D78bB103FAb4bAc1259Da207Da3861 |

## Terra CW20 Contracts

| asset | mainnet                                      | bombay-12                                    |
| ----- | -------------------------------------------- | -------------------------------------------- |
| vETH  |                                              | terra10wtgtg7m22e9hpyhqmfj7zvapnp2uv5m44x375 |
| bETH  | terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun | terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l |

## Usage Instructions

**NOTE:** Only assets recognized (listed above) can be used with Shuttle. Sending an asset not mentioned in this document will result in permanent loss of funds.

### Terra => Ethereum 

To transfer an asset from Terra to Ethereum using Shuttle, burn the asset inside a transaction whose memo field is set to the recipient address on the destination chain.

#### CW20 Tokens

Wrapped ERC20(= CW20) assets must be sent by calling the token contract using a `MsgExecuteContract`.

**HandleMsg JSON:**

```json
{
  "burn": {
    "amount": "100000000"
  }
}
```

**Transaction containing MsgExecuteContract**:

The following transaction burn 100 vETH tokens from `terra1t849fxw7e8ney35mxemh4h3ayea4zf77dslwna` on `bombay-12` to `0x320bc76961fb4e2a0e2e86d43d4b9d13b4985b8f` on Ethereum mainnet.

```json
{
  "type": "core/StdTx",
  "value": {
    "msg": [
      {
        "type": "wasm/MsgExecuteContract",
        "value": {
          "sender": "terra1t849fxw7e8ney35mxemh4h3ayea4zf77dslwna",
          "contract": "terra10wtgtg7m22e9hpyhqmfj7zvapnp2uv5m44x375",
          "execute_msg": "eyJidXJuIjogeyJhbW91bnQiOiAiMTAwMCJ9fQ==",
          "coins": []
        }
      }
    ],
    "fee": { ... },
    "signatures": [ ... ],
    "memo": "0x320bc76961fb4e2a0e2e86d43d4b9d13b4985b8f"
  }
}
```

Example transactions:

- Terra Tx:

  https://finder.terra.money/bombay-12/tx/9B25831560D88B021C97496B63D0B849112945F81AFE1FE0023F4F1B25FD51DC

  https://bombay-lcd.terra.dev/txs/9B25831560D88B021C97496B63D0B849112945F81AFE1FE0023F4F1B25FD51DC

- Ethereum Tx:

  https://ropsten.etherscan.io/tx/0x348e30304506b05ac4c3b42670cd568b4d6d630e3e6816803e92e462df41b10e

### Ethereum => Terra

> Shuttle waits 7 block confirmations before relaying a tx.

**Need to increase ERC20 token transfer allowance first before executing `burn` operation of vault contract.**

Execute `burn(uint256 amount, bytes32 to)` of corresponding vault contract with bech32 decoded terra address
`burn('1000000000000000000', '0x890d71d9e7031a9a09b82c214dba08a413e133a5000000000000000000000000')`.

Terra address has 20 bytes constant length, so it implies `burn('amount', 'unbech32(TerraAddress)' + '0' * 24)`.

Ex)

- Ethereum Tx:

  https://ropsten.etherscan.io/tx/0x8c0142615f290369d7dd7c95c105ca40368fc3b64db97c7523427ab13ce86236

- Terra Tx:

  https://finder.terra.money/bombay-12/tx/53E4270D0C87AA663E524973FB26614A5601013D22EE292096514702C1622B82
