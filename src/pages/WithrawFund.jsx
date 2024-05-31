import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton, FormField, Loader } from '../components';

import { 
  useNetworkContext,
  useCampaignContext 
} from "@context/index";
import { toast } from 'react-hot-toast';

import { withrawETHToAddress, raisedAmountBalance } from '@utils/index';
import { transaction_history } from '@assets/index';

const WithrawFund = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const {
    address,
    isConnected,
    chainId,
    provider,
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

  const fetchBalance = async () => {
    const b = await raisedAmountBalance(address);
    console.log(b);
    setBalance(b);
  }

  useEffect(()=>{
    if(address) fetchBalance();
  }, [address])

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      if (!isConnected) throw Error("Connect to a ETH wallet !")
      if(balance && parseFloat(balance) < parseFloat(form.amount)) throw Error("Not enough balance");

      setIsLoading(true);

      await withrawETHToAddress(provider, form.address, form.amount);
      
      toast.success("Withdrawal success !");
      fetchBalance();
      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  }

  // console.log()

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 relative">
      {isLoading && <Loader />}
      <div className='flex'>
        <Link to="/withdrawal-history">
          <img src={transaction_history} className='absolute w-[30px] h-[30px] right-[20px] top-[20px]' />
        </Link>
      </div>
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Withdraw Raised Amount</h1>
      </div>

      <div className='flex justify-start flex-row w-full pt-[20px] text-white'>
        {balance && <p>Raised Amount Balance: {balance} ETH</p>}
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
            placeholder={balance ? `MAX : ${balance} ETH` : '1.2 ETH'}
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