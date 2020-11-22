const WrappedMSFT = artifacts.require("WrappedMSFT");
const WrappedAMZN = artifacts.require("WrappedAMZN");
const WrappedBABA = artifacts.require("WrappedBABA");
const WrappedIAU = artifacts.require("WrappedIAU");
const WrappedSLV = artifacts.require("WrappedSLV");
const WrappedUSO = artifacts.require("WrappedUSO");
const WrappedVIXY = artifacts.require("WrappedVIXY");

module.exports = function (deployer) {
  deployer.deploy(WrappedMSFT);
  deployer.deploy(WrappedAMZN);
  deployer.deploy(WrappedBABA);
  deployer.deploy(WrappedIAU);
  deployer.deploy(WrappedSLV);
  deployer.deploy(WrappedUSO);
  deployer.deploy(WrappedVIXY);
};
