# Shuttle Bridge

![Shuttle Banner](/resources/banner.png)

Shuttle is a Terra-Ethereum bridge. Currently only allows Terra assets to be sent between Terra and Ethereum networks, and only supports the transfer of [whitelisted](#erc20-contracts) assets.

## Table of Contents

- [Shuttle Bridge](#shuttle-bridge)
  - [Table of Contents](#table-of-contents)
  - [Implementations](#implementations)
  - [Components](#components)
  - [Relaying Fee](#relaying-fee)
  - [How to add tokens?](#how-to-add-tokens)
    - [Terra token support](#terra-token-support)
    - [Ethereum token support](#ethereum-token-support)

## Implementations

- [Ethereum Contracts](./contracts)
- [Ethereum side Shuttle](./eth)
- [Terra side Shuttle](./terra)

## Components

- [Ethereum Asset](./ETH_ASSET.md)
- [Terra Asset](./TERRA_ASSET.md)

## Relaying Fee
Shuttle charges a fee only for transferring assets from Terra to Ethereum/BSC, and the quantity is calculated as `max($1, 0.1% * amount)`. **A transaction with tiny amount smaller than $1 value will be ignored.**

## How to add tokens?

### Terra token support
1. [Ethereum] Deploy WrappedToken Contract and do verify the contract code 
2. [Ethereum] Transfer ownership to proper minter address (minter address can be found in [here](TERRA_ASSET.md#erc20-contracts))

### Ethereum token support
DEPRECATED
