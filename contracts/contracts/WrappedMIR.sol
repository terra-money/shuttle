// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedMIR is WrappedToken {
    constructor() public WrappedToken("Wrapped MIR Token", "MIR") {}
}
