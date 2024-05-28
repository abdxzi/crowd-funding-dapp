import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { pinJson } from '../utils/pinata';
import {
  updateCampaign
} from '../utils/contract';
import { useNetworkContext,
  useCampaignContext } from "@context/index";
import { toast } from 'react-hot-toast';

const WithrawFund = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    address,
    isConnected,
    chainId,
    provider,
    signer
  } = useNetworkContext()

  const {
    fetchCampaigns
  } = useCampaignContext()

  const [form, setForm] = useState({
    address: '',
    amount: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!isConnected) {
      toast.error("Connect to a ETH wallet !")
      return;
    }

    try {
      setIsLoading(true);

      //  Create Campaign Here
      const now = new Date()
    
      setIsLoading(false);
      // navigate('/profile')
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Withdraw Raised Amount</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Address to withdraw *"
            placeholder="0xb794f5ea0ba39494ce839613fffba74279579268"
            inputType="text"
            value={form.address}
            handleChange={(e) => handleFormFieldChange('address', e)}
          />
          <FormField
            labelName="Amount to withdraw (ETH) *"
            placeholder="1.2 ETH"
            inputType="text"
            value={form.amount}
            handleChange={(e) => handleFormFieldChange('amount', e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Withdraw Fund"
            styles="bg-[#1dc071]"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  )
}

export default WithrawFund