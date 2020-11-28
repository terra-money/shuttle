const WrappedSDT = artifacts.require("WrappedSDT");

module.exports = function (deployer) {
  deployer.deploy(WrappedSDT);
};
