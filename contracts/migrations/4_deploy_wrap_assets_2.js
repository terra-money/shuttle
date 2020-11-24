const WrappedmQQQ = artifacts.require("WrappedmQQQ");
const WrappedmTWTR = artifacts.require("WrappedmTWTR");
const WrappedmMSFT = artifacts.require("WrappedmMSFT");
const WrappedmAMZN = artifacts.require("WrappedmAMZN");
const WrappedmBABA = artifacts.require("WrappedmBABA");

module.exports = function (deployer) {
  deployer.deploy(WrappedmQQQ);
  deployer.deploy(WrappedmTWTR);
  deployer.deploy(WrappedmMSFT);
  deployer.deploy(WrappedmAMZN);
  deployer.deploy(WrappedmBABA);
};
