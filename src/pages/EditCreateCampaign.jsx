import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';

// import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { pinJson } from '../utils/pinata';
import {
  getCamapaignList,
  createCampaignFcn
} from '../utils/contract';
import { useNetworkContext } from "@context/index";
import { toast } from 'react-hot-toast';

const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    address,
    isConnected,
    chainId,
    provider,
    signer
  } = useNetworkContext()

  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '=',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const _create = async () => {
    
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!isConnected) {
      toast.error("Connect to a ETH wallet !")
      return;
    }

    console.log("Form");

    const imageExists = checkIfImage(form.image);

    if (imageExists) {
      setIsLoading(true);

      //  Create Campaign Here
      // pinJson(form)

      // console.log(provider);
      await createCampaignFcn(provider, "http://localhost:5173/json/1.json");
      await getCamapaignList();

      setIsLoading(false);
      navigate('/');
    } else {
      toast.error('Provide valid image URL')
      setForm({ ...form, image: '' });
    }
  }

  const testFcn = ()=> {
    console.log("Test")
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
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
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