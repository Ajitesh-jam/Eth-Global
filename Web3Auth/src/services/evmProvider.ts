import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

// import { json } from "stream/consumers";
import { IWalletProvider } from "./walletProvider";

const ethersWeb3Provider = (provider: IProvider | null, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  const getAddress = async (): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();
      return address;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getChainId = async (): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      return (await ethersProvider.getNetwork()).chainId.toString(16);
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getBalance = async (): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = signer.getAddress();

      // Get user's balance in ether
      const res = ethers.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );
      const balance = (+res).toFixed(4);
      return balance;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getSignature = async (message: string): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();
      // Sign the message
      const signedMessage = await signer.signMessage(message);
      return signedMessage;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const sendTransaction = async (amount: string, destination: string): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();

      const amountBigInt = ethers.parseEther(amount);

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: destination,
        value: amountBigInt,
        maxPriorityFeePerGas: "5000000", // Max priority fee per gas
        maxFeePerGas: "6000000000", // Max fee per gas
      });

      return `Transaction Hash: ${tx.hash}`;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const buyTokens = async (contractAddress: string, contractABI: any, amount: string): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
  
      const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);
  
      // Convert the amount of Ether to send into BigInt format
      const amountBigInt = ethers.parseEther(amount);
  
      // Send Ether to the smart contract to buy tokens
      const tx = await contract.buyTokens({
        value: amountBigInt, // Ether value for the transaction
        maxPriorityFeePerGas: "5000000", // Max priority fee per gas
        maxFeePerGas: "6000000000", // Max fee per gas
      });
  
      // Wait for the transaction to complete
      const receipt = await tx.wait();
      return receipt;
    } catch (error: any) {
      uiConsole(error);
      return `Error: ${error.message || error}`;
    }
  };

  const getPrivateKey = async (): Promise<string> => {
    try {
      const privateKey = await provider?.request({
        method: "eth_private_key",
      });
      console.log("super secret key --->"+privateKey)
      return privateKey as string;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const readContract = async (contractAddress: string, contractABI: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
      uiConsole(contractABI);

      const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);

      // Read message from smart contract
      console.log(signer)
      const message = await contract.getTokens(signer.address);
      const messageStr = message.toString();
      return messageStr; 
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const writeContract = async (contractAddress: string, contractABI: any, updatedValue: string) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);

      // Send transaction to smart contract to update message
      const tx = await contract.buyItem(updatedValue);

      // Wait for transactionSmart Contract Interactions to finish
      const receipt = await tx.wait();
      return receipt;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const sellItems = async (contractAddress: string, contractABI: any, updatedValue: string) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);

      // Send transaction to smart contract to update message
      const value = parseInt(updatedValue);

      const tx = await contract.sellItem(value);

      // Wait for transactionSmart Contract Interactions to finish
      const receipt = await tx.wait();
      return receipt;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const sellTokens = async (contractAddress: string, contractABI: any, updatedValue: string) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);

      // Send transaction to smart contract to update message
      const value = parseInt(updatedValue);

      const tx = await contract.sellTokens(value);

      // Wait for transactionSmart Contract Interactions to finish
      const receipt = await tx.wait();
      return receipt;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const readTokens = async (contractAddress: string, contractABI: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
      uiConsole(contractABI);

      const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);

      // Read message from smart contract
      const message = await contract.getTokens(signer.address);
      const messageStr = message.toString();
      return messageStr; 
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const readItems = async (contractAddress: string, contractABI: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethersProvider.getSigner();
      uiConsole(contractABI);

      const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);

      // Read message from smart contract
      const message = await contract.getItems(signer.address);
      const messageStr = message.toString();
      return messageStr; 
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };


  return {
    getAddress,
    getBalance,
    getChainId,
    getSignature,
    sendTransaction,
    getPrivateKey,
    readContract,
    writeContract,
    readItems,
    readTokens,
    sellItems,
    sellTokens,
    buyTokens,
  };
};

export default ethersWeb3Provider;
