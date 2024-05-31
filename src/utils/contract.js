import { ethers } from "ethers";

import CONTRACT_ABI from "./abi/CrowdFund.json"
import { toast } from "react-hot-toast";
import { fetchAllWithdrawals, fetchCampaignList, insertToTable, updateTable } from "./database";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const RPC_URL = import.meta.env.VITE_RPC_URL;

const providerPublic = new ethers.JsonRpcProvider(RPC_URL);


const createCampaignFcn = async (provider, _cid) => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);

    const event_abi = [
        "event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid)"
    ];

    const iface = new ethers.Interface(event_abi);


    try {
        const tx = await contract.createCampaign(_cid);
        const reciept = await tx.wait();

        const eventLog = reciept.logs[0];
        const _campaign_id = eventLog.args.campaign_id;
        const _campaign_cid = eventLog.args.cid;
        const _creator = eventLog.args.by;
        // console.log("created id", _campaign_id);

        // Add to database
        await insertToTable('campaigns', { campaign_id: _campaign_id.toString(), cid: _campaign_cid, createdby: _creator });
        // console.log(db_data);

        toast.success("Campaign Created Successfuly")
    } catch (e) {
        console.log(e.message)
        toast.error("Transaction Failed")
    }
}

const getCamapaignList = async () => {

    const campaigns = await fetchCampaignList('campaigns');
    if (!campaigns) return []

    return campaigns;
}

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

    // Updates the new CID in db obtained after smartcontract success execution
    const eventLog = reciept.logs[0];
    const _newCid = eventLog.args.newCid;
    const _campaign_id = eventLog.args.campaign_id;

    await updateTable('campaigns', {cid: _newCid}, {campaign_id: _campaign_id.toString()});
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

    const eventLog = reciept.logs[0];
    const _by = eventLog.args.by;
    const _am = eventLog.args.amount;
    const _to = eventLog.args.to;

    await insertToTable('withdrawals', {address: _by, amount: _am.toString(), recievedby: _to});
}

const fetchWithdrawals = async (address) => {
    const withdraws =  await fetchAllWithdrawals(address);
    return withdraws;
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