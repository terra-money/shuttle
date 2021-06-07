# Shuttle Bridge

![Shuttle Banner](/resources/banner.png)

Shuttle is a Terra-Ethereum bridge. Currently only allows Terra assets to be sent between Terra and Ethereum networks, and only supports the transfer of [whitelisted](#erc20-contracts) assets.

## Table of Contents

- [Shuttle Bridge](#shuttle-bridge)
  - [Table of Contents](#table-of-contents)
  - [Implementations](#implementations)
  - [Components](#components)
  - [Relaying Fee](#relaying-fee)

## Implementations

- [Ethereum Contracts](./contracts)
- [Ethereum side Shuttle](./eth)
- [Terra side Shuttle](./terra)

## Components

- [Ethereum Asset](./ETH_ASSET.md)
- [Terra Asset](./TERRA_ASSET.md)

## Relaying Fee
Shuttle charges a fee only for transferring assets from Terra to Ethereum/BSC, and the quantity is calculated as `max($1, 0.1% * amount)`. **A transaction with tiny amount smaller than $1 value will be ignored.**
