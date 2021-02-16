// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmTSLA is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror TSLA Token", "mTSLA") {}
}
