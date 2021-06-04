// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "./ShuttleVault.sol";

contract vETH is ShuttleVault {
    constructor(address _token) public ShuttleVault(_token) {}
}
