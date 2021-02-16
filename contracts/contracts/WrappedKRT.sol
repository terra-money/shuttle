// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedKRT is WrappedToken {
    constructor() public WrappedToken("Wrapped KRT Token", "KRT") {}
}
