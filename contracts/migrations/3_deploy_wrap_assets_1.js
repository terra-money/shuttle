const WrappedMIR = artifacts.require("WrappedMIR");
const WrappedmAAPL = artifacts.require("WrappedmAAPL");
const WrappedmGOOGL = artifacts.require("WrappedmGOOGL");
const WrappedmTSLA = artifacts.require("WrappedmTSLA");
const WrappedmNFLX = artifacts.require("WrappedmNFLX");

module.exports = function (deployer) {
  deployer.deploy(WrappedMIR);
  deployer.deploy(WrappedmAAPL);
  deployer.deploy(WrappedmGOOGL);
  deployer.deploy(WrappedmTSLA);
  deployer.deploy(WrappedmNFLX);
};
