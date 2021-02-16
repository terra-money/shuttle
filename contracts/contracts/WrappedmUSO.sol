// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmUSO is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror USO Token", "mUSO") {}
}
