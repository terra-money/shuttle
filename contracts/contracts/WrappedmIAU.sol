// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmIAU is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror IAU Token", "mIAU") {}
}
