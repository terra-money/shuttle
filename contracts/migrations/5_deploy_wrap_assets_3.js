const WrappedmIAU = artifacts.require("WrappedmIAU");
const WrappedmSLV = artifacts.require("WrappedmSLV");
const WrappedmUSO = artifacts.require("WrappedmUSO");
const WrappedmVIXY = artifacts.require("WrappedmVIXY");

module.exports = function (deployer) {
  deployer.deploy(WrappedmIAU);
  deployer.deploy(WrappedmSLV);
  deployer.deploy(WrappedmUSO);
  deployer.deploy(WrappedmVIXY);
};
