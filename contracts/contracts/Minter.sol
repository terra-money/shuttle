// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;
pragma experimental ABIEncoderV2;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ECDSA} from "@openzeppelin/contracts/cryptography/ECDSA.sol";

import {WrappedToken} from "./WrappedToken.sol";

interface IMinter {
    function threshold() external view returns (uint256);

    function nonce() external view returns (uint256);

    function signerLength() external view returns (uint256);

    function isSigner(address _candidate) external view returns (bool);

    function verify(bytes32 _hash, bytes[] calldata _signatures)
        external
        view
        returns (bool);

    function mint(
        address _token,
        address _to,
        uint256 _amount,
        bytes32 _txHash,
        bytes[] calldata _signatures
    ) external;
}

contract Minter is IMinter {
    // whitelist
    uint256 private signerCount = 0;
    mapping(address => bool) private signers;

    // nonce
    uint256 public override threshold = 1;
    uint256 public override nonce = 0;

    constructor(
        uint256 _threshold,
        uint256 _nonce,
        address[] memory _signers
    ) public {
        threshold = _threshold;
        nonce = _nonce;
        for (uint256 i = 0; i < _signers.length; i++) {
            signers[_signers[i]] = true;
        }
    }

    // modifier
    modifier withNonce {
        _;

        nonce++;
    }

    // gov
    function changeThreshold(uint256 _newThreshold, bytes[] memory _signatures)
        public
        withNonce
    {
        require(
            verify(
                keccak256(abi.encodePacked(nonce, _newThreshold)),
                _signatures
            ),
            "Minter: invalid signature"
        );
        threshold = _newThreshold;
    }

    function addSigner(address _signer, bytes[] memory _signatures)
        public
        withNonce
    {
        require(
            verify(keccak256(abi.encodePacked(nonce, _signer)), _signatures),
            "Minter: invalid signature"
        );
        signerCount++;
        signers[_signer] = true;
    }

    function removeSigner(address _signer, bytes[] memory _signatures)
        public
        withNonce
    {
        require(
            verify(keccak256(abi.encodePacked(nonce, _signer)), _signatures),
            "Minter: invalid signature"
        );
        signerCount--;
        signers[_signer] = false;
    }

    function collectOwnership(
        address _token,
        address _to,
        bytes[] memory _signatures
    ) public withNonce {
        require(
            verify(
                keccak256(abi.encodePacked(nonce, _token, _to)),
                _signatures
            ),
            "Minter: invalid signature"
        );
        Ownable(_token).transferOwnership(_to);
    }

    // mint
    function mint(
        address _token,
        address _to,
        uint256 _amount,
        bytes32 _txHash,
        bytes[] memory _signatures
    ) public override withNonce {
        require(
            verify(keccak256(abi.encodePacked(nonce, _txHash)), _signatures),
            "Minter: invalid signature"
        );

        WrappedToken(_token).mint(_to, _amount);
    }

    // view
    function signerLength() public view override returns (uint256) {
        return signerCount;
    }

    function isSigner(address _candidate) public view override returns (bool) {
        return signers[_candidate];
    }

    function verify(bytes32 _hash, bytes[] memory _signatures)
        public
        view
        override
        returns (bool)
    {
        bytes32 h = ECDSA.toEthSignedMessageHash(_hash);
        address lastSigner = address(0x0);
        address currentSigner;

        for (uint256 i = 0; i < _signatures.length; i++) {
            currentSigner = ECDSA.recover(h, _signatures[i]);

            if (currentSigner <= lastSigner) {
                return false;
            }
            if (!signers[currentSigner]) {
                return false;
            }
            lastSigner = currentSigner;
        }

        if (_signatures.length < threshold) {
            return false;
        }

        return true;
    }
}
