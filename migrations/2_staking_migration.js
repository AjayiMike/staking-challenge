const staking = artifacts.require("staking");

module.exports = function (deployer) {
  const creatorAddress = "0xfe89Bc35f0ae233a4E619b44C41caF7eAF78a411",
  lpTokenAddress = "0x27F507e58D73a5D4e7149bac0FB521a6Af2ba46a"
  deployer.deploy(staking, lpTokenAddress, creatorAddress);
};
