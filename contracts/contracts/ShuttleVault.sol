// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import {IWrappedToken} from "./WrappedToken.sol";

contract ShuttleVault is IWrappedToken, Context {
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function burn(uint256 _amount, bytes32 _to) public override {
        token.safeTransferFrom(_msgSender(), address(this), _amount);

        emit Burn(_msgSender(), to, amount);
    }

    function mint(address _account, uint256 _amount) public override onlyOwner {
        token.safeTransfer(_account, _amount);
    }
}
