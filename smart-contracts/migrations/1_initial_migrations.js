const Voting = artifacts.require("../contracts/Voting.sol");

module.exports = async function (deployer) {
    await deployer.deploy(Voting);  // Deploy contract
    let instance = await Voting.deployed(); // Get deployed contract instance
    console.log("Voting contract deployed at:", instance.address);
};
