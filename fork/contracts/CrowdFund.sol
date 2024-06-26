// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CrowdFund {
    uint256 private counter;

    constructor() {
        counter = 0;
    }

    enum campaignState {
        STARTED,
        PAUSED,
        ENDED
    }

    struct Campaign {
        address createdBy;
        string cid;
        bool exists;
        campaignState state;
        address[] donors;
    }

    struct ID {
        uint256 id;
    }

    // EVENTS
    event CampaignCreated(address indexed by, uint256 indexed campaign_id, string cid);
    event CampaignUpdated(address indexed by, uint256 indexed campaign_id, string newCid);
    event FundRecieved(address indexed from, address indexed to, uint256 amount, uint256 indexed campaign_id);
    event FundWithdrawed(address indexed by, uint256 amount, address to);

    // MAPPINGS
    mapping(uint256 => Campaign) campaigns;
    mapping(address => ID[]) public campaignList;
    mapping(uint256 => uint256) public amountOf;
    mapping(address => uint256) public balanceOf;

    // MODIFIER
    modifier onlyCampaignOwner(uint256 _campaignId) {
        require(msg.sender == campaigns[_campaignId].createdBy, "UNAUTHORIZED !");    
        _;
    }

    // Generate Unique ID
    function generateId() private returns (uint256) {
        uint256 newId = counter;
        counter++;
        return newId;
    }

    // Create a campaign
    function createCampaign(string memory cid) external {
        uint256 campaign_id = generateId();

        campaigns[campaign_id] = Campaign(msg.sender, cid, true, campaignState.STARTED, new address[](0));
        campaignList[msg.sender].push(ID(campaign_id));

        amountOf[campaign_id] = 0;

        emit CampaignCreated(msg.sender, campaign_id, cid);
    }

    // Update campaign Content Identifier
    function updateCampaignCID(uint256 _campaignId, string memory _newCid) external onlyCampaignOwner(_campaignId) {
        campaigns[_campaignId].cid = _newCid;
        emit CampaignUpdated(msg.sender, _campaignId, _newCid);
    }

    // Retrieve a campaign CID
    function getCampaignCID(uint256 _campaignId) public view returns (string memory) {
        require(campaigns[_campaignId].exists, "INVALID ID");

        Campaign memory c = campaigns[_campaignId];
        return c.cid;
    }

    // Retrieve List of campaigns created by a address
    function getCampaignList(address _address) public view returns (Campaign[] memory) {
        ID[] memory ids = campaignList[_address];
        Campaign[] memory campaignsArray = new Campaign[](ids.length);

        for(uint i=0; i<ids.length; i++){
            Campaign memory _campaign = campaigns[ids[i].id];
            campaignsArray[i] = _campaign;
        }

        return campaignsArray;
    }

    // Donate to a camapign
    function donate(uint256 _campaignId) external payable {
        require(campaigns[_campaignId].state == campaignState.STARTED, "CAMPAIGN NOT ACTIVE");

        address creator = campaigns[_campaignId].createdBy;
        amountOf[_campaignId] += msg.value;
        balanceOf[creator] += msg.value;

        campaigns[_campaignId].donors.push(msg.sender);

        emit FundRecieved(msg.sender, creator, msg.value, _campaignId);
    }

    // Get Donors of a campaingn
    function getDonors(uint256 _campaignId) external view returns (address[] memory){
        return campaigns[_campaignId].donors;
    }

    // Pause a Campaign
    function pauseCampaign(uint256 _campaignId) external onlyCampaignOwner(_campaignId) {
        campaigns[_campaignId].state = campaignState.PAUSED;
    }

    // Unpause a campaign
    function unpauseCampaign(uint256 _campaignId) external onlyCampaignOwner(_campaignId) {
        campaigns[_campaignId].state = campaignState.STARTED;
    }

    // Withdraw Fund raised
    function withdrawFund(address _address, uint256 amount) external{
        require(balanceOf[msg.sender] > amount, "Insufficient Balance");

        (bool success,) = payable(_address).call{value: amount}("");
        require(success, "TRANSACTION FAILED");

        balanceOf[msg.sender] -= amount;

        emit FundWithdrawed(msg.sender, amount, _address);
    }
}