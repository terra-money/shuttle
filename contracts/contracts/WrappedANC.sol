// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedANC is WrappedToken {
    constructor() public WrappedToken("Wrapped ANC Token", "ANC") {}
}
