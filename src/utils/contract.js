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
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);
    const event_created_abi = [
        "event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid)"
    ];

    const event_updated_abi = [
        "event CampaignUpdated(address indexed by, uint256 indexed campaign_id, string newCid)"
    ];

    const created_filter = {
        address: CONTRACT_ADDRESS,
        topics: [
            ethers.id("CampaignCreated(address,uint256,string)")
        ]
    };
    const updated_filter = {
        address: CONTRACT_ADDRESS,
        topics: [
            ethers.id("CampaignUpdated(address,uint256,string)")
        ]
    };

    const created_logs = await providerPublic.getLogs({
        created_filter,
        fromBlock: 0,
        toBlock: 'latest'
    });

    const updated_logs = await providerPublic.getLogs({
        updated_filter,
        fromBlock: 0,
        toBlock: 'latest'
    });

    const created_iface = new ethers.Interface(event_created_abi);
    const updated_iface = new ethers.Interface(event_updated_abi);

    let campaigns = [];

    created_logs.map((log) => {
        const e = created_iface.parseLog(log);
        if (e) campaigns.push({
            createdBy: e.args.by,
            cid: e.args.cid,
            campaign_id: e.args.campaign_id
        })
    });

    let updates = []
    updated_logs.map((log) => {
        const e = updated_iface.parseLog(log);
        if (e) updates.push(e.args.campaign_id)
    });

    updates = [...new Set(updates)]
    updates.forEach(async id => {
        const newCid = await contract.getCampaignCID(id);

        console.log(newCid)
        const _camp = campaigns.find(campaign => campaign.campaign_id === id);

        _camp.cid = newCid;
    });

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

const donate = async (signer, campaign_id, _amount) => {
    console.log(signer)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

    console.log(campaign_id, _amount)

    const amountToSend = ethers.parseEther(_amount);
    const tx = await contract.donate(BigInt(campaign_id), { value: amountToSend });

    tx.wait();
}

const amountOf = async (campaign_id) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);

    const amount = await contract.amountOf(campaign_id);
    return ethers.formatEther(amount);
}

const updateCampaign = async (provider, campaign_id, _cid) => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);
    const tx = await contract.updateCampaignCID(campaign_id, _cid);
    const reciept = await tx.wait();
    return reciept.status
}

const raisedAmountBalance = async (address) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);

    const balance = await contract.balanceOf(address);
    const balance_ether = ethers.formatEther(balance);

    return balance_ether
}

const withrawETHToAddress = async (provider, address, _amount) => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

    const amount = ethers.parseEther(_amount);
    const tx = await contract.withdrawFund(address, amount);

    const reciept = await tx.wait();
    return reciept.status;
}

const fetchWithdrawals = async (address) => {
    // const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, providerPublic);
    const event_abi = [
        "event FundWithdrawed(address indexed by, uint256 amount, address to)"
    ];

    const filter = {
        address: CONTRACT_ADDRESS,
        topics: [
            ethers.id("FundWithdrawed(address,uint256,address)")
        ]
    };

    const logs = await providerPublic.getLogs({
        filter,
        fromBlock: 0,
        toBlock: 'latest'
    });

    const iface = new ethers.Interface(event_abi);

    let withdraws = [];

    logs.map((log) => {
        const e = iface.parseLog(log);
        if (e) withdraws.push({
            owner: e.args.by,
            amount: ethers.formatEther(e.args.amount),
            to: e.args.to
        })
    });

    const res = withdraws.filter( log => log.owner == address)
    return res
}

export {
    createCampaignFcn,
    getCamapaignList,
    getAmountCollected,
    fetchDonors,
    donate,
    amountOf,
    updateCampaign,
    withrawETHToAddress,
    raisedAmountBalance,
    fetchWithdrawals
}