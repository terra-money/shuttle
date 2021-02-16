// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmAAPL is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror AAPL Token", "mAAPL") {}
}
