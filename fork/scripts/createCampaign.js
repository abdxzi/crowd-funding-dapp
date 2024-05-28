const hre = require("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("CrowdFund");
    const contract = MyContract.attach(
      "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    );
    
    // Now you can call functions of the contract
    await contract.createCampaign("bafkreid5vxhlohp6jw4jbxj477lie2m4xagrlvva7ggkawwv5ftv64xcku");
    await contract.createCampaign("bafkreicv7dexblju4e57etjxndllmq3fkqds3hvljjag6c4435mkk2j5a4");
    // await contract.createCampaign("");
    // await contract.createCampaign("");
    // await contract.createCampaign("");
    // await contract.createCampaign("");

    // tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 