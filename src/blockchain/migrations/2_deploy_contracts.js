const weightContract = artifacts.require("storePolybagWeight");
//const weightContract = artifacts.require("../contracts/weight.contract.sol");

module.exports = function (deployer) {
    deployer.deploy(weightContract);
};