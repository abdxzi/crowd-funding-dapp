const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Attacker Prespective:", () => {
    let contract, owner, another_account;
    let example_cid = "1st_campaign_cid";

    before(async () => {
        [owner, another_account] = await ethers.getSigners();
        const CrowdFund = await ethers.getContractFactory("CrowdFund");
        contract = await CrowdFund.deploy();
    });

    it('Non Owner cant change a campaignCID', async () => {
        try {
            await contract.createCampaign(example_cid);
        } catch (error) {
            expect(error.reason).to.equal('UNAUTHORIZED!');
        }
    });
})