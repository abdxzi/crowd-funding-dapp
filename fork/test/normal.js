const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFund: Normal Function Checks", ()=>{
    let contract, owner;
    let example_cid = "1st_campaign_cid";

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

        await contract.updateCampaignCID(0, "1st_campaign_updated_cid");
        const cid = await contract.getCampaignCID(0);

        expect(cid).to.be.eq("1st_campaign_updated_cid")
    })

    it('getCampaignList()', async ()=> {
        const address = owner.getAddress()
        await contract.createCampaign("2nd_campaign_cid")

        const a = await contract.getCampaignList(address);
        
        // console.log("getCampaignIDs: ", a);
    })

    it('donate()', async ()=> {
        const address = owner.getAddress()

        const amountToSend = ethers.parseEther("20.0");
        const tx = await contract.donate(BigInt(0), { value: amountToSend });
        await tx.wait();

        const amount = await contract.amountOf(BigInt(0));
        
        expect(amount).to.be.eq(amountToSend)
    })

    it('getDonors()', async ()=> {
        const address = owner.getAddress()

        const donors = await contract.getDonors(BigInt(0));
        expect(donors.length).to.be.eq(1)

        // console.log(donors)
    })

    it('pauseCampaign()', async ()=> {
        const address = owner.getAddress()

        await contract.pauseCampaign(BigInt(0));
    })
    
    it('unpauseCampaign()', async ()=> {
        const address = owner.getAddress()

        await contract.unpauseCampaign(BigInt(0));
    })

    it('withdrawFund()', async ()=> {
        const address = owner.getAddress()
        
        const _amount = ethers.parseEther("19.0")

        await contract.withdrawFund("0x0000000000000000000000000000000000000000", _amount);
        const balanceAfter = await contract.balanceOf(address);

        expect(balanceAfter).to.be.eq(ethers.parseEther("1.0"))
    })


})