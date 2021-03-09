const WrappedaUST = artifacts.require("WrappedaUST");

module.exports = function (deployer, network) {
  if (network == "mainnet" || network == "ropsten") {
    deployer.deploy(WrappedaUST);
  }
};
