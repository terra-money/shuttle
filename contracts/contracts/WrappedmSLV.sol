// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmSLV is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror SLV Token", "mSLV") {}
}
