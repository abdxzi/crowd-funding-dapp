import { pinJson } from "./pinata";
import { 
  getCamapaignList, 
  createCampaignFcn, 
  getAmountCollected, 
  fetchDonors,
  donate,
  amountOf
} from "./contract";

const _gateway = import.meta.env.VITE_IPFS_GATEWAY;


export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

const getCamapignData = async (campaigns, amountObject) => {
  const fetchPromises = campaigns.map((campaign) => 
    fetch(`${_gateway}/${campaign.cid}`)
    .then(response => response.json())
    .then(data => ({ 
      ...campaign,
      ...data,
      amountCollected: amountObject[campaign.campaign_id]
    }))
  )
  const metadataArray = await Promise.all(fetchPromises);
  return metadataArray;
}

export {
  pinJson,
  createCampaignFcn,
  getCamapaignList,
  getCamapignData,
  getAmountCollected,
  fetchDonors,
  donate,
  amountOf
}