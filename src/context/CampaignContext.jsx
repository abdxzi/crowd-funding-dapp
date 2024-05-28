import {
    createContext,
    useContext,
    useState
} from "react";
import {
    getCamapaignList,
    getAmountCollected,
    getCamapignData
} from "@utils/index";

const CampaignContext = createContext()
export const useCampaignContext = () => useContext(CampaignContext);

export const CampaignContextProvider = ({ children }) => {

    const [campaigns, setCampaigns] = useState([]);

    const fetchCampaigns = async () => {
        const campaign_list = await getCamapaignList();
        const raisedAmount = await getAmountCollected(campaign_list);
        const metadata = await getCamapignData(campaign_list, raisedAmount);

        setCampaigns(metadata);
    }

    return (
        <CampaignContext.Provider value={{
            campaigns,
            fetchCampaigns,
            // modifyCampaignState
        }}>
            {children}
        </CampaignContext.Provider>
    );
}