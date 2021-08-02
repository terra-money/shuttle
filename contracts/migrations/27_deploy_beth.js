const bETH = artifacts.require("bETH");

const CHAIN_ID = {
  mainnet: 1,
  ropsten: 3,
  kovan: 42,
  bsc: 56,
  bsc_testnet: 97,
  hmy: 1666600000,
  hmy_testnet: 1666700000,
};

module.exports = function (deployer, network) {
  if (network == "mainnet") {
    deployer.deploy(
      bETH,
      "0x707F9118e33A9B8998beA41dd0d46f38bb963FC8",
      {
        gas: 2000000,
        overwrite: false,
        chainId: CHAIN_ID[network],
      }
    );
  } else if (network == "ropsten") {
    deployer.deploy(
      bETH,
      "0xA60100d5e12E9F83c1B04997314cf11685A618fF",
      {
        gas: 2000000,
        overwrite: false,
        chainId: CHAIN_ID[network],
      }
    );
  }
};
