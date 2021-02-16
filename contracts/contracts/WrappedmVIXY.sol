// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmVIXY is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror VIXY Token", "mVIXY") {}
}
