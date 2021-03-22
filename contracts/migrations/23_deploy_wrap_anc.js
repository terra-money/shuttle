const WrappedANC = artifacts.require("WrappedANC");

const CHAIN_ID = {
  mainnet: 1,
  ropsten: 3,
  kovan: 42,
  bsc: 56,
  bsc_testnet: 97,
};

module.exports = function (deployer, network) {
  if (network == "mainnet" || network == "ropsten") {
    deployer.deploy(WrappedANC, {
      gas: 5000000,
      overwrite: false,
      chainId: CHAIN_ID[network],
    });
  }
};
