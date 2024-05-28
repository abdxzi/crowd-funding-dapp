const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFund: Normal Function Checks", ()=>{
    let contract, owner;
    let example_cid = "sjgieihesoindsoigheoigheoihewogiheoigheogih";

    before(async () => {
        [owner] = await ethers.getSigners();
        const CrowdFund = await ethers.getContractFactory("CrowdFund");
        contract = await CrowdFund.deploy();
    });

    it('createCampaign()', async ()=>{
        await contract.createCampaign(example_cid)
    });

    it('getCampaignCID()', async ()=> {
        const address = owner.getAddress()
        const a = await contract.getCampaignCID(0);

        expect(a).to.be.eq(example_cid)
    })

    it('updateCampaignCID()', async ()=> {
        const address = owner.getAddress()

        await contract.updateCampaignCID(0, "http://localhost:5173/json/1.json");
        const cid = await contract.getCampaignCID(0);

        expect(cid).to.be.eq("abcd")
    })

    it('getCampaignAmount()', async () => {
        const address = owner.getAddress()
        const a = await contract.getCampaignAmount(0);

        expect(a).to.be.eq(0);
    })

    it('getCampaignIDs()', async ()=> {
        const address = owner.getAddress()

        // create another campaign
        await contract.createCampaign("sdkjvhivivi")
        const a = await contract.getCampaignIDs(address);
        
        console.log("getCampaignIDs: ", a);
    })

})