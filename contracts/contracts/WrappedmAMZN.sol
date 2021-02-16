// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmAMZN is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror AMZN Token", "mAMZN") {}
}
