const WrappedUST = artifacts.require("WrappedUST");

module.exports = function (deployer) {
  deployer.deploy(WrappedUST);
};
