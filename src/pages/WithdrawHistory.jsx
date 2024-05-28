import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Loader } from '../components';

import {
  useNetworkContext,
  useCampaignContext
} from "@context/index";

import { toast } from 'react-hot-toast';
import { fetchWithdrawals } from '@utils';

const WithrawalHistory = () => {

  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(null);

  const {
    address,
    isConnected,
    chainId,
    provider,
  } = useNetworkContext()

  const fetchWithdrawHistory = async () => {
    const wh = await fetchWithdrawals(address);
    setHistory(wh);
  }

  useEffect(() => {
    if (address) fetchWithdrawHistory();
  }, [address])

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 relative w-full">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Withdrawals</h1>
      </div>
      {
        !isConnected && <h1 className="font-epilogue font-semibold text-[18px] text-white text-left mt-6">Connect to a wallet !</h1>
      }

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">#</th>
                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">Amount</th>
                    <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">To</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    history?.map((transaction, i) => {
                      return (
                        <tr className="text-white border-b" key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{i + 1}</td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">{transaction.amount} ETH</td>
                          <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">{transaction.to}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WithrawalHistory;