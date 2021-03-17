const WrappedANC = artifacts.require("WrappedANC");

module.exports = function (deployer, network) {
  if (network == "mainnet" || network == "ropsten") {
    deployer.deploy(WrappedANC, {gas: 5000000, overwrite: false});
  }
};
