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

contract WrappedLuna is WrappedToken {
    constructor() public WrappedToken("Wrapped LUNA Token", "wluna") {}
}

contract WrappedUST is WrappedToken {
    constructor() public WrappedToken("Wrapped UST Token", "wust") {}
}

contract WrappedKRT is WrappedToken {
    constructor() public WrappedToken("Wrapped KRT Token", "wkrt") {}
}

contract WrappedSDT is WrappedToken {
    constructor() public WrappedToken("Wrapped SDT Token", "wsdt") {}
}

contract WrappedMNT is WrappedToken {
    constructor() public WrappedToken("Wrapped MNT Token", "wmnt") {}
}

contract WrappedMIR is WrappedToken {
    constructor() public WrappedToken("Wrapped MIR Token", "wmir") {}
}

contract WrappedAAPL is WrappedToken {
    constructor() public WrappedToken("Wrapped AAPL Token", "waapl") {}
}

contract WrappedGOOGL is WrappedToken {
    constructor() public WrappedToken("Wrapped GOOGL Token", "wgoogl") {}
}

contract WrappedTSLA is WrappedToken {
    constructor() public WrappedToken("Wrapped TSLA Token", "wtsla") {}
}

contract WrappedNFLX is WrappedToken {
    constructor() public WrappedToken("Wrapped NFLX Token", "wnflx") {}
}

contract WrappedQQQ is WrappedToken {
    constructor() public WrappedToken("Wrapped QQQ Token", "wqqq") {}
}

contract WrappedTWTR is WrappedToken {
    constructor() public WrappedToken("Wrapped TWTR Token", "wtwtr") {}
}

contract WrappedMSFT is WrappedToken {
    constructor() public WrappedToken("Wrapped MSFT Token", "wmsft") {}
}

contract WrappedAMZN is WrappedToken {
    constructor() public WrappedToken("Wrapped AMZN Token", "wamzn") {}
}

contract WrappedBABA is WrappedToken {
    constructor() public WrappedToken("Wrapped BABA Token", "wbaba") {}
}

contract WrappedIAU is WrappedToken {
    constructor() public WrappedToken("Wrapped IAU Token", "wiau") {}
}

contract WrappedSLV is WrappedToken {
    constructor() public WrappedToken("Wrapped SLV Token", "wslv") {}
}

contract WrappedUSO is WrappedToken {
    constructor() public WrappedToken("Wrapped USO Token", "wuso") {}
}

contract WrappedVIXY is WrappedToken {
    constructor() public WrappedToken("Wrapped VIXY Token", "wvixy") {}
}
