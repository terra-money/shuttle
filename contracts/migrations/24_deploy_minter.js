const Minter = artifacts.require("Minter");

const CHAIN_ID = {
  mainnet: 1,
  ropsten: 3,
  kovan: 42,
  bsc: 56,
  bsc_testnet: 97,
};

module.exports = function (deployer, network) {
  if (network == "ropsten") {
    deployer.deploy(
      Minter,
      "2",
      "1",
      [
        "0xdB1d788c0194538E897a1C51Ac9c86a65b37DC46",
        "0x926d6A9649b383409945F4035b4Dd51858271745",
        "0x45e3f2fEac0906AA9d5CB38d6C6937947FCA2724",
      ],
      {
        gas: 5000000,
        overwrite: false,
        chainId: CHAIN_ID[network],
      }
    );
  } else if (network == "mainnet") {
  }
};
