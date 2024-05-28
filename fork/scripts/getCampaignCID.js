const hre = require("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("CrowdFund");
    const contract = MyContract.attach(
      "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    );

    const _campaignId = 1;

    // Now you can call functions of the contract
    const c = await contract.getCampaignCID(BigInt(_campaignId));
    console.log(c)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 