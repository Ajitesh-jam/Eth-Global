import { getPublicCompressed } from "@toruslabs/eccrypto";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import * as jose from "jose";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { chain } from "../config/chainConfig";
import { getWalletProvider } from "./walletProvider";
export const PlaygroundContext = createContext({
    walletProvider: null,
    isLoading: false,
    address: null,
    balance: null,
    chainId: null,
    playgroundConsole: "",
    chainList: chain,
    chainListOptionSelected: "ethereum",
    connectedChain: chain.ethereum,
    getUserInfo: async () => null,
    getAddress: async () => "",
    getBalance: async () => "",
    getSignature: async () => "",
    sendTransaction: async () => "",
    getPrivateKey: async () => "",
    getChainId: async () => "",
    readContract: async () => "",
    readTokens: async () => "",
    readItems: async () => "",
    writeContract: async () => "",
    sellItem: async () => "",
    sellTokens: async () => "",
    getIdToken: async () => "",
    verifyServerSide: async () => { },
    switchChain: async () => null,
    updateConnectedChain: () => { },
    buyTokens: async () => "",
});
export function usePlayground() {
    return useContext(PlaygroundContext);
}
export const Playground = ({ children }) => {
    const [walletProvider, setWalletProvider] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);
    const [chainList, setChainDetails] = useState(chain);
    const [chainListOptionSelected, setChainListOptionSelected] = useState("ethereum");
    const [chainId, setChainId] = useState(null);
    const [playgroundConsole, setPlaygroundConsole] = useState("");
    const [connectedChain, setConnectedChain] = useState(chain.ethereum);
    const uiConsole = (...args) => {
        setPlaygroundConsole(`${JSON.stringify(args || {}, null, 2)}\n\n\n\n${playgroundConsole}`);
        console.log(...args);
    };
    const { initModal, isConnected, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
    // const { showCheckout, showWalletConnectScanner, showWalletUI } = useWalletServicesPlugin();
    const setNewWalletProvider = useCallback(async (web3authProvider) => {
        setWalletProvider(getWalletProvider(web3authProvider, uiConsole));
        setAddress(await walletProvider?.getAddress());
        setBalance(await walletProvider?.getBalance());
        setChainId(await walletProvider?.getChainId());
    }, [chainId, address, balance]);
    useEffect(() => {
        async function init() {
            try {
                setIsLoading(true);
                if (isConnected)
                    setNewWalletProvider(provider);
                else {
                    try {
                        await initModal();
                        connect();
                    }
                    catch (error) {
                        uiConsole(error);
                    }
                }
            }
            catch (error) {
                uiConsole(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        if (web3Auth) {
            init();
        }
    }, [web3Auth, isConnected, provider, connect, initModal, setNewWalletProvider]);
    const getUserInfo = async () => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return;
        }
        uiConsole(userInfo);
        return userInfo;
    };
    const getAddress = async () => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return "";
        }
        const updatedAddress = await walletProvider.getAddress();
        setAddress(updatedAddress);
        uiConsole(updatedAddress);
        return address;
    };
    const getBalance = async () => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return "";
        }
        const updatedBalance = await walletProvider.getBalance();
        setBalance(updatedBalance);
        uiConsole(updatedBalance);
        return balance;
    };
    const getSignature = async (message) => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return "";
        }
        const signature = await walletProvider.getSignature(message);
        uiConsole(signature);
        return signature;
    };
    const sendTransaction = async (amount, destination) => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return "";
        }
        const receipt = await walletProvider.sendTransaction(amount, destination);
        uiConsole(receipt);
        return receipt;
    };
    const getPrivateKey = async () => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return "";
        }
        const privateKey = await walletProvider.getPrivateKey();
        uiConsole("Private Key: ", privateKey);
        return privateKey;
    };
    const getChainId = async () => {
        if (!web3Auth) {
            uiConsole("web3Auth not initialized yet");
            return "";
        }
        await walletProvider.getChainId();
    };
    const readContract = async (contractAddress, contractABI) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const message = await walletProvider.readContract(contractAddress, contractABI);
        uiConsole(message);
    };
    const readItems = async (contractAddress, contractABI) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const message = await walletProvider.readItems(contractAddress, contractABI);
        uiConsole(message);
    };
    const readTokens = async (contractAddress, contractABI) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const message = await walletProvider.readTokens(contractAddress, contractABI);
        uiConsole(message);
    };
    const writeContract = async (contractAddress, contractABI, updatedValue) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const receipt = await walletProvider.writeContract(contractAddress, contractABI, updatedValue);
        uiConsole(receipt);
    };
    const sellItem = async (contractAddress, contractABI, updatedValue) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const receipt = await walletProvider.sellItems(contractAddress, contractABI, updatedValue);
        uiConsole(receipt);
    };
    const sellTokens = async (contractAddress, contractABI, updatedValue) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        const receipt = await walletProvider.sellTokens(contractAddress, contractABI, updatedValue);
        uiConsole(receipt);
    };
    const buyTokens = async (contractAddress, contractABI, updatedValue) => {
        if (!provider) {
            uiConsole("provider not initialized yet");
            return;
        }
        console.log(updatedValue);
        const receipt = await walletProvider.buyTokens(contractAddress, contractABI, updatedValue);
        uiConsole(receipt);
    };
    const parseToken = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64 || ""));
        }
        catch (err) {
            console.error(err);
            return null;
        }
    };
    const getIdToken = async () => {
        const idToken = await authenticateUser();
        uiConsole("Id Token: ", parseToken(idToken.idToken));
        return idToken.idToken;
    };
    const verifyServerSide = async (idTokenInFrontend) => {
        try {
            if (!provider) {
                uiConsole("provider not initialized yet");
                return;
            }
            // ideally this should be done on the server side
            if (web3Auth.connectedAdapterName === WALLET_ADAPTERS.OPENLOGIN) {
                const privKey = await provider?.request({
                    method: "eth_private_key",
                });
                const pubkey = getPublicCompressed(Buffer.from(privKey, "hex")).toString("hex");
                const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks"));
                const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, {
                    algorithms: ["ES256"],
                });
                const pubKeyFromIdToken = jwtDecoded.payload.wallets.find((x) => x.type === "web3auth_app_key").public_key;
                if (pubKeyFromIdToken === pubkey) {
                    uiConsole("Validation Success!", "Public Key from Provider: ", pubkey, "Public Key from decoded JWT: ", pubKeyFromIdToken, "Parsed Id Token: ", await parseToken(idTokenInFrontend));
                }
            }
            else {
                const jwks = jose.createRemoteJWKSet(new URL("https://authjs.web3auth.io/jwks"));
                const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, {
                    algorithms: ["ES256"],
                });
                const addressFromIdToken = jwtDecoded.payload.wallets.find((x) => x.type === "ethereum").address;
                if (addressFromIdToken.toLowerCase() === address.toLowerCase()) {
                    uiConsole("Validation Success!", "Address from Provider: ", address, "Address from decoded JWT: ", addressFromIdToken, "Parsed Id Token: ", await parseToken(idTokenInFrontend));
                }
            }
        }
        catch (e) {
            uiConsole(e);
        }
    };
    const updateConnectedChain = (chainDetails) => {
        if (typeof chainDetails === "string") {
            setConnectedChain(chainList[chainDetails]);
            setChainListOptionSelected(chainDetails);
            return;
        }
        if (typeof chainDetails === "object") {
            if (!(chainDetails.displayName in
                Object.keys(chainList).map(function (k) {
                    return chainList[k].displayName;
                }))) {
                setChainDetails({ ...chain, custom: chainDetails });
            }
            setConnectedChain(chainDetails);
            setChainListOptionSelected("custom");
            return;
        }
        uiConsole("No network or chainDetails provided");
    };
    const switchChain = async (chainConfig) => {
        if (!web3Auth || !provider) {
            uiConsole("web3Auth or provider is not initialized yet");
            return;
        }
        try {
            setIsLoading(true);
            await addAndSwitchChain(chainConfig);
            setChainId(await walletProvider.getChainId());
            setAddress(await walletProvider.getAddress());
            setBalance(await walletProvider.getBalance());
            updateConnectedChain(chainConfig);
            setIsLoading(false);
            uiConsole("Chain switched successfully");
        }
        catch (error) {
            uiConsole("Failed to switch chain", error);
            setIsLoading(false);
        }
    };
    const contextProvider = {
        walletProvider,
        isLoading,
        address,
        balance,
        chainId,
        playgroundConsole,
        connectedChain,
        chainList,
        chainListOptionSelected,
        getUserInfo,
        getAddress,
        getBalance,
        getSignature,
        sendTransaction,
        getPrivateKey,
        getChainId,
        readContract,
        writeContract,
        verifyServerSide,
        getIdToken,
        switchChain,
        updateConnectedChain,
        readTokens,
        readItems,
        sellItem,
        sellTokens,
        buyTokens,
    };
    return React.createElement(PlaygroundContext.Provider, { value: contextProvider }, children);
};
//# sourceMappingURL=playground.js.map