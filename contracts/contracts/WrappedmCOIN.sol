// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmCOIN is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror COIN Token", "mCOIN") {}
}
