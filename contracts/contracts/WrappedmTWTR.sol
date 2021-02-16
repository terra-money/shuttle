// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmTWTR is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror TWTR Token", "mTWTR") {}
}
