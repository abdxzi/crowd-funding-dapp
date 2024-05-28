const hre = require("hardhat");

const { eventABI } = require("./abi/event.json");

const main = async () => {
    const provider = ethers.provider;

    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    console.log("SIGNER:", signerAddress);

    const MyContract = await ethers.getContractFactory("CrowdFund");
    const contract = MyContract.attach(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );

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


    // console.log(filter);
    console.log(logs.length);

    // const iface = new hre.ethers.Interface(eventABI)
    // console.log(iface.parseLog(logs[0]));

    const abi = [
        "event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid)"
    ];

    const iface = new ethers.Interface(abi);

    const cm = [];

    logs.map((log)=> {
        const event = iface.parseLog(log);

        cm.push(event)

        console.log(event)
    })

    console.log(cm)
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
