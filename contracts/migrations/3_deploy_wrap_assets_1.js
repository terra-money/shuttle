const WrappedMIR = artifacts.require("WrappedMIR");
const WrappedAAPL = artifacts.require("WrappedAAPL");
const WrappedGOOGL = artifacts.require("WrappedGOOGL");
const WrappedTSLA = artifacts.require("WrappedTSLA");
const WrappedNFLX = artifacts.require("WrappedNFLX");
const WrappedQQQ = artifacts.require("WrappedQQQ");
const WrappedTWTR = artifacts.require("WrappedTWTR");

module.exports = function (deployer) {
  deployer.deploy(WrappedMIR);
  deployer.deploy(WrappedAAPL);
  deployer.deploy(WrappedGOOGL);
  deployer.deploy(WrappedTSLA);
  deployer.deploy(WrappedNFLX);
  deployer.deploy(WrappedQQQ);
  deployer.deploy(WrappedTWTR);
};
