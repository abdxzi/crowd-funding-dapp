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

const CreateCampaign = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
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
    owner: state.owner,
    title: state.title,
    description: state.description,
    target: state.target,
    deadline: state.deadline,
    image: state.image
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
      const imageExists = await checkIfImage(form.image);
      if (!imageExists) throw Error("Provide valid image URL");

      setIsLoading(true);

      //  Create Campaign Here
      const now = new Date()
      const metadata = {
        ...form,
        ownerAddress: address,
        startDate: state.startDate
      }

      const ipfs = await pinJson(metadata);
      if (!ipfs.IpfsHash) throw Error("Metadata upload failed !")

      const updated = await updateCampaign(provider, state.campaign_id, ipfs.IpfsHash);
      // console.log(ipfs.IpfsHash, tx);

      if(updated){
        await fetchCampaigns();
        toast.success("Campaign updated")
      } else {
        throw Error("Something Went Wrong !")
      }

      setIsLoading(false);
      navigate('/profile')
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Edit your Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.owner}
            handleChange={(e) => handleFormFieldChange('owner', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="0.50 ETH"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Update Campaign Data"
            styles="bg-[#1dc071]"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign