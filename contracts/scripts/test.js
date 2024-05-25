const hre = require("hardhat");
const {
    deploy_contract
} = require("./helpers");

const { eventABI } = require("./abi/event.json");
// const { ethers } = require("ethers");

const main = async () => {
    const provider = ethers.provider;

    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    console.log("SIGNER:", signerAddress);

    const contract = await deploy_contract("CrowdFund");

    await contract.createCampaign("abcdefghijk");
    await contract.createCampaign("doigsoigesoiesi");
    await contract.createCampaign("doigsoigesoiesi");

    const cid = await contract.getCampaignCID(0);
    console.log(cid);

    const filter = contract.filters.CampaignCreated();
    // const filter = {
    //     address: contract.target,
    //     topics: [
    //         ethers.id("CampaignCreated(address,uint256,string)")
    //     ]
    // };


    const logs = await provider.getLogs({
        filter,
        fromBlock: 0,
        toBlock: 'latest'
    });


    console.log(filter);
    console.log(logs);

    // const iface = new hre.ethers.Interface(eventABI)
    // console.log(iface.parseLog(logs[0]));

    const abi = [
        "event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid)"
    ];

    const iface = new ethers.Interface(abi);

    const event = iface.parseLog(logs[0]);
    console.log(event);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
