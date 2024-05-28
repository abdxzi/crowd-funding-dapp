import React from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns, isProfile }) => {
  const navigate = useNavigate();

  const handleCardDetailsNavigation = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  const handleCardEditNavigation = (campaign) => {
    navigate(`/update-campaign`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign, i) => <FundCard 
          key={i}
          {...campaign}
          handleClick={() => isProfile ? handleCardEditNavigation(campaign) :  handleCardDetailsNavigation(campaign)}
          isProfile={isProfile}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns