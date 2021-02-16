// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedLuna is WrappedToken {
    constructor() public WrappedToken("Wrapped LUNA Token", "LUNA") {}
}
