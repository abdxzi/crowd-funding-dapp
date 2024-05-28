const hre = require("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("CrowdFund");
    const contract = MyContract.attach(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    
    // Now you can call functions of the contract
    const amountToSend = hre.ethers.parseEther("2.0")
    const tx = await contract.donate(BigInt(1), { value: amountToSend });

    tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 