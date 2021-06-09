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
| asset | mainnet | ropsten                                    |
| ----- | ------- | ------------------------------------------ |
| vETH  |         | 0xc778417E063141139Fce010982780140Aa0cD5Ab |
| bETH  |         | 0xA60100d5e12E9F83c1B04997314cf11685A618fF |

## ETH Vault Contracts

| asset | mainnet | ropsten                                    |
| ----- | ------- | ------------------------------------------ |
| vETH  |         | 0xB9C9dC335F7059446f0a33c40eE6743b44973d45 |
| bETH  |         | 0xDD7e8f8047D78bB103FAb4bAc1259Da207Da3861 |

## Terra CW20 Contracts

| asset | mainnet | tequila-0004                                 |
| ----- | ------- | -------------------------------------------- |
| vETH  |         | terra10wtgtg7m22e9hpyhqmfj7zvapnp2uv5m44x375 |
| bETH  |         | terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l |

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

The following transaction burn 100 vETH tokens from `terra1t849fxw7e8ney35mxemh4h3ayea4zf77dslwna` on `tequila-0004` to `0x320bc76961fb4e2a0e2e86d43d4b9d13b4985b8f` on Ethereum mainnet.

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

  https://finder.terra.money/tequila-0004/tx/8401C73E15F6177C1ADFB006A78D678BAC487702821E4E4C1B975296B76F417A

  https://tequila-lcd.terra.dev/txs/8401C73E15F6177C1ADFB006A78D678BAC487702821E4E4C1B975296B76F417A

- Ethereum Tx:

  https://ropsten.etherscan.io/tx/0x62e5d7d0ad5617ad5b9c0327db485098b7c98602ab76f56d8b6691cf20c7bc72

### Ethereum => Terra

> Shuttle waits 7 block confirmations before relaying a tx.

**Need to increase ERC20 token transfer allowance first before executing `burn` operation of vault contract.**

Execute `burn(uint256 amount, bytes32 to)` of corresponding vault contract with bech32 decoded terra address
`burn('1000000000000000000', '0x890d71d9e7031a9a09b82c214dba08a413e133a5000000000000000000000000')`.

Terra address has 20 bytes constant length, so it implies `burn('amount', 'unbech32(TerraAddress)' + '0' * 24)`.

Ex)

- Ethereum Tx:

  https://ropsten.etherscan.io/tx/0x9710ac3c12b30e750a852b9b7c4492f2d56daf61fe114e655b0b3f257fa267d3

- Terra Tx:

  https://tequila.stake.id/?#/tx/BA4311659B57F80A2FF870767856C3DDCAC6B2BA0A891EDC294B804AAEFC44FE
