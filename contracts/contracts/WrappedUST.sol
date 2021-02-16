// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedUST is WrappedToken {
    constructor() public WrappedToken("Wrapped UST Token", "UST") {}
}
