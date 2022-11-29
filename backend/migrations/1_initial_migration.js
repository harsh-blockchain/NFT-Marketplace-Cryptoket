var NFTMarketPlace = artifacts.require("NFTMarketPlace");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(NFTMarketPlace);
};