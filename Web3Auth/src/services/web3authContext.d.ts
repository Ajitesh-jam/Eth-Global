import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
declare const web3AuthContextConfig: {
    web3AuthOptions: Web3AuthOptions;
    adapters: (import("@web3auth/base").IAdapter<unknown> | OpenloginAdapter)[];
    plugins: WalletServicesPlugin[];
};
export default web3AuthContextConfig;
