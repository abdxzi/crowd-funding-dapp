import React, { useState, useEffect, useCallback } from 'react'

import { DisplayCampaigns } from '../components';
import {
  useCampaignContext,
  useNetworkContext
} from '@context';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myCampaigns, setMyCampaigns] = useState(false);

  const {
    fetchCampaigns,
    campaigns
  } = useCampaignContext()

  const {
    isConnected,
    address
  } = useNetworkContext()

  useEffect(() => {
    if (campaigns.length == 0 && isConnected) fetchCampaigns();
  }, [address]);

  useEffect(() => {
    setMyCampaigns(campaigns.filter((campaign) => campaign.createdby == address));
  }, [campaigns, address])



  return (
    <>
      {
        isConnected && address && <DisplayCampaigns
          title="Your Campaigns"
          isLoading={isLoading}
          campaigns={myCampaigns}
          isProfile={true}
        />
      }
      {
        !isConnected && <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">Connect to a wallet !</h1>
      }
    </>
  )
}

export default Profile