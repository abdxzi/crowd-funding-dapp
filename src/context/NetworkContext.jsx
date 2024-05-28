import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider
} from "@web3modal/ethers/react";

import { ethers } from "ethers";

const getNetworkBalance = async (walletProvider, address) => {
    if (!walletProvider) return null;
    const provider = new ethers.BrowserProvider(walletProvider);
    const signer = await provider.getSigner();

    // console.log(await provider.getBalance(address))

    // const balHex = await signer.getBalance();
    // const balance = parseFloat(ethers.utils.formatUnits(balHex)).toFixed(3);

    // return balance;
}

const NetworkContext = createContext()
export const useNetworkContext = () => useContext(NetworkContext);

export const NetworkContextProvider = ({ children }) => {

    const { chainId, isConnected, address } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const [networkBalance, setNetworkBalance] = useState(0);
    const [provider, setProvider] = useState(undefined);

    // IF CHAIN ID CHAINGED, FETCH TOKEN LIST, NETWORK INFO, NETWORK BALANCE
    useEffect(() => {
        // if connected, fetch chain data
        if (chainId) {
            getNetworkBalance(walletProvider, address).then(
                bal => setNetworkBalance(bal)
            );
        }
        // If connected, set ethers provider
        if (isConnected) {
            const _p = new ethers.BrowserProvider(walletProvider);
            setProvider(_p);
        }
    }, [chainId, address]);


    return (
        <NetworkContext.Provider value={{
            networkBalance,
            provider,
            isConnected,
            address,
            chainId
        }}>
            {children}
        </NetworkContext.Provider>
    );
}