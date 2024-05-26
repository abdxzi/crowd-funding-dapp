import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { 
  getCamapaignList,
  getCamapignData, 
  getAmountCollected
} from '@utils/index';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    setIsLoading(true);

    const campaign_list = await getCamapaignList();

    const raisedAmount = await getAmountCollected(campaign_list);
    const metadata = await getCamapignData(campaign_list, raisedAmount);

    setCampaigns(metadata);
    setIsLoading(false);
  }
  
  console.log(campaigns)

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home