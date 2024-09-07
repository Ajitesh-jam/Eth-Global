import type { IProvider } from "@web3auth/base";
import { IWalletProvider } from "./walletProvider";
declare const ethersWeb3Provider: (provider: IProvider | null, uiConsole: (...args: unknown[]) => void) => IWalletProvider;
export default ethersWeb3Provider;
