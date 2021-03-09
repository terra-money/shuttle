const WrappedANC = artifacts.require("WrappedANC");

module.exports = function (deployer, network) {
    if (network == "mainnet" || network == "ropsten") {
        deployer.deploy(WrappedANC, { overwrite: false, chainId: 1, gas: 5500000 });
    }
};
