const Minter = artifacts.require("Minter");

const CHAIN_ID = {
  mainnet: 1,
  ropsten: 3,
  kovan: 42,
  bsc: 56,
  bsc_testnet: 97,
};

const SIGNERS = {
  mainnet: [],
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
  bsc: [],
  bsc_testnet: [],
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
      gas: 5000000,
      overwrite: false,
      chainId: CHAIN_ID[network],
    });
  }
};
