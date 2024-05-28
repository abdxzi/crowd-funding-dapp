import React, { useState, useEffect, useMemo } from 'react'

import { DisplayCampaigns } from '../components';
import { useCampaignContext } from '@context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { 
    fetchCampaigns,
    campaigns
  } = useCampaignContext()

  useEffect(() => {
    setIsLoading(true);
    if(campaigns.length == 0) fetchCampaigns();
    setIsLoading(false);
  }, []);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
      isProfile={false}
    />
  )
}

export default Home