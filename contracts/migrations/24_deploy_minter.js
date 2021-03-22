const Minter = artifacts.require("Minter");

const CHAIN_ID = {
  mainnet: 1,
  ropsten: 3,
  kovan: 42,
  bsc: 56,
  bsc_testnet: 97,
};

const SIGNERS = {
  mainnet: [
    "0xeF118eaE1dF71229E69A34aAbC4BB99bcd046Ad9",
    "0x1774c24dA3F5bfbBccE4A3003EA590489eA438e8",
    "0x191E80A9Ae86d6680Cfcf2688D2bDE15820F6669",
  ],
  ropsten: [
    "0xdB1d788c0194538E897a1C51Ac9c86a65b37DC46",
    "0x926d6A9649b383409945F4035b4Dd51858271745",
    "0x45e3f2fEac0906AA9d5CB38d6C6937947FCA2724",
  ],
  kovan: [
    "0xBE652bFF15fB7DF4Ba5Af85A55bfA8C711658BCd",
    "0xbE101A9AD6265837Be6a9948a8a17098665E2cee",
    "0xc0e2973a78AeA34EbB12fB5fe1b62F4286D8872d",
  ],
  bsc: [
    "0x34847BABC016dAD309d01763bB51D42ef9908d70",
    "0x90904E78236768ad037d44dabE1FC155852588C2",
    "0xC24E190C76c99763c5361e65283BF6C5c6F9f178",
  ],
  bsc_testnet: [
    "0x5024ECAefBa0767eB5B569EC4fc309F8FDc833d7",
    "0x55C1cAd03272930D4A07873bC6bfA4b910a8d9F1",
    "0xE1354334627a9e0Fa3E6583155803ad70AF4d341",
  ],
};
module.exports = function (deployer, network) {
  if (
    network == "mainnet" ||
    network == "ropsten" ||
    network == "kovan" ||
    network == "bsc" ||
    network == "bsc_testnet"
  ) {
    deployer.deploy(Minter, "2", "1", SIGNERS[network], {
      gas: 1300000,
      overwrite: false,
      chainId: CHAIN_ID[network],
    });
  }
};
