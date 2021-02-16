// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedMNT is WrappedToken {
    constructor() public WrappedToken("Wrapped MNT Token", "MNT") {}
}
