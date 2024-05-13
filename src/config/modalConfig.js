import { networks } from "./modalNetworks"
import { ethersConfig, projectId } from "./providerConfig";

/*
    WEB3MODAL CONFIGURATIONS
*/

export const modalConfig = {
    ethersConfig,
    chains: networks,
    projectId,
    enableAnalytics: false,
    // termsConditionsUrl: 'https://www.mytermsandconditions.com',
    // privacyPolicyUrl: 'https://www.myprivacypolicy.com',
    // themeVariables: {
    //     '--w3m-color-mix': '#13131a',
    //     '--w3m-color-mix-strength': 10
    // }
}