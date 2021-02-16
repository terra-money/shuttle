// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedToken is ERC20, Ownable {
    event Burn(address indexed _sender, bytes32 indexed _to, uint256 amount);

    constructor(string memory name, string memory symbol)
        public
        ERC20(name, symbol)
    {}

    function burn(uint256 amount, bytes32 to) public {
        _burn(_msgSender(), amount);

        emit Burn(_msgSender(), to, amount);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}
