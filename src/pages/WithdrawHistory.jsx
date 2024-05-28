import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Loader } from '../components';

import { 
  useNetworkContext,
  useCampaignContext 
} from "@context/index";

import { toast } from 'react-hot-toast';

const WithrawalHistory = () => {

  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    address,
    isConnected,
    chainId,
    provider,
  } = useNetworkContext()

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 relative">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Withdrawals</h1>
      </div>
    </div>
  )
}

export default WithrawalHistory;