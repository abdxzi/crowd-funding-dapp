import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { 
  getCamapaignList,
  getJson
} from '@utils/index';
// import {  } from 'src/utils/pinata';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    setIsLoading(true);

    const campaign_list = await getCamapaignList();
    const json = await getJson(campaign_list);
    setCampaigns(json);
    setIsLoading(false);
  }

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