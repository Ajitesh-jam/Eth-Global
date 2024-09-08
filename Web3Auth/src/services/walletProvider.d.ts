import { IProvider } from "@web3auth/base";
export interface IWalletProvider {
    getAddress: () => Promise<string>;
    getBalance: () => Promise<string>;
    getChainId: () => Promise<string>;
    getSignature: (message: string) => Promise<string>;
    sendTransaction: (amount: string, destination: string) => Promise<string>;
    getPrivateKey: () => Promise<string>;
    readContract: (contractAddress: string, contractABI: any) => Promise<string>;
    writeContract: (contractAddress: string, contractABI: any, updatedValue: string) => Promise<string>;
    readItems: (contractAddress: string, contractABI: any) => Promise<string>;
    readTokens: (contractAddress: string, contractABI: any) => Promise<string>;
    sellItems: (contractAddress: string, contractABI: any, updatedValue: string) => Promise<any>;
    sellTokens: (contractAddress: string, contractABI: any, updatedValue: string) => Promise<any>;
    buyTokens: (contractAddress: string, contractABI: any, amount: string) => Promise<any>;
}
export declare const getWalletProvider: (provider: IProvider | null, uiConsole: any) => IWalletProvider;
