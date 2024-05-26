import { ethers } from "ethers";

import CONTRACT_ABI from "../../fork/artifacts/contracts/CrowdFund.sol/CrowdFund.json"
import { toast } from "react-hot-toast";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const RPC_URL = import.meta.env.VITE_RPC_URL;

const providerPublic = new ethers.JsonRpcProvider(RPC_URL);


const createCampaignFcn = async (provider, _cid) => {
    const signer = await provider.getSigner();
    // console.log(signer, _cid, CONTRACT_ADDRESS)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

    try {
        await contract.createCampaign(_cid);

        toast.success("Campaign Created Successfuly")
    } catch (e) {
        toast.error("Transaction Failed")
    }
}

const getCamapaignList = async () => {
    const event_abi = [
        "event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid)"
    ];

    const filter = {
        address: CONTRACT_ADDRESS,
        topics: [
            ethers.id("CampaignCreated(address,uint256,string)")
        ]
    };

    const logs = await providerPublic.getLogs({
        filter,
        fromBlock: 0,
        toBlock: 'latest'
    });

    const iface = new ethers.Interface(event_abi);

    let campaigns = []

    logs.map((log) => {
        const e = iface.parseLog(log);
        if(e) campaigns.push({
            createdBy: e.args.by,
            cid: e.args.cid,
            campaign_id: e.args.campaign_id
        })

        // console.log(e);
    })

    return campaigns;
}

// const getCampaignsOfAddress = async (creator, signer) => {
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

//     const res = await contract.getCampaignIDs(creator);
//     console.log(res);
// }


const getAmountCollected = async (campaigns) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);

    const promises = campaigns.map((campaign) =>
        contract.amountOf(campaign.campaign_id)
            .then(res => ({
                campaign_id: campaign.campaign_id,
                amountCollected: ethers.formatEther(res)
            }))
    );
    const amounts = await Promise.all(promises);
    const singleObj = amounts.reduce((acc, current) => {
        acc[current.campaign_id] = current.amountCollected;
        return acc;
    }, {});

    return singleObj;
}

const fetchDonors = async (campaign_id) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);
    console.log("CAMID", campaign_id)
    const donors = await contract.getDonors(campaign_id);

    const uniq = [...new Set(Object.values(donors))]
    return uniq;
}

const donate = async (signer, _amount) => {
    console.log(signer)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

    const amountToSend = ethers.parseEther(_amount);
    const tx = await contract.donate(BigInt(1), { value: amountToSend });

    tx.wait();
}

const amountOf = async (campaign_id) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);
    
    const amount = await contract.amountOf(campaign_id);
    return ethers.formatEther(amount);
} 

export {
    createCampaignFcn,
    getCamapaignList,
    // getCampaignsOfAddress,
    getAmountCollected,
    fetchDonors,
    donate,
    amountOf
}