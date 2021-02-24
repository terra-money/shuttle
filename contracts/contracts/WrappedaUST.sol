// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedaUST is WrappedToken {
    constructor() public WrappedToken("Wrapped Anchor UST Token", "aUST") {}
}
