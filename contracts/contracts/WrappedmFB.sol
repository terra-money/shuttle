// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmFB is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror FB Token", "mFB") {}
}
