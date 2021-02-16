// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmMSFT is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror MSFT Token", "mMSFT") {}
}
