// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedmBABA is WrappedToken {
    constructor() public WrappedToken("Wrapped Mirror BABA Token", "mBABA") {}
}
