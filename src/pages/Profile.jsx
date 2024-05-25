import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
// import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);


  // const { address, contract, getUserCampaigns } = useStateContext();

  const address = false;
  const contract = true;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    // const data = await getUserCampaigns();
    setCampaigns([
      {
        owner: "Azeez",
        title: "Green Farm 3",
        description: "A wonderful android game",
        target: "20",
        deadline: "2024-06-02",
        amountCollected: "4",
        image: "https://i.ytimg.com/vi/Heu1V9DNO7o/maxresdefault.jpg",
        ownerAddress: "abc", 
      },
      {
        owner: "Azeez",
        title: "Bored App",
        description: "An NFT venture that going to explode",
        target: "50",
        deadline: "2024-06-02",
        amountCollected: "10",
        image: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/03/bored-ape-nft.jpg",
        ownerAddress: "abc", 
      },
      {
        owner: "Azeez",
        title: "FundCroewd 1",
        description: "A nice One",
        target: "5",
        deadline: "2024-06-02",
        amountCollected: "4.23",
        image: "http://localhost:5173/images/1.png",
        ownerAddress: "cd",
      }
    ])
    // setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile