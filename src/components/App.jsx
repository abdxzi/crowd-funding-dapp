import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from '@components';
import { CampaignDetails, CreateCampaign, Home, Profile, EditCampaign, WithrawFund } from '@pages/index';

// WEB3MODAL
import { modalConfig } from '@config'
import { createWeb3Modal } from '@web3modal/ethers/react';
createWeb3Modal(modalConfig);

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/update-campaign" element={<EditCampaign />} />
          <Route path="/withdraw" element={<WithrawFund />} />
        </Routes>
      </div>
    </div>
  )
}

export default App