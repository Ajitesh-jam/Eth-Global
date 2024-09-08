import { ethers } from "ethers";
const ethersWeb3Provider = (provider, uiConsole) => {
    const getAddress = async () => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            // Get user's Ethereum public address
            const address = await signer.getAddress();
            return address;
        }
        catch (error) {
            uiConsole(error);
            return error.toString();
        }
    };
    const getChainId = async () => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            return (await ethersProvider.getNetwork()).chainId.toString(16);
        }
        catch (error) {
            uiConsole(error);
            return error.toString();
        }
    };
    const getBalance = async () => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            // Get user's Ethereum public address
            const address = signer.getAddress();
            // Get user's balance in ether
            const res = ethers.formatEther(await ethersProvider.getBalance(address) // Balance is in wei
            );
            const balance = (+res).toFixed(4);
            return balance;
        }
        catch (error) {
            uiConsole(error);
            return error.toString();
        }
    };
    const getSignature = async (message) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            // Sign the message
            const signedMessage = await signer.signMessage(message);
            return signedMessage;
        }
        catch (error) {
            uiConsole(error);
            return error.toString();
        }
    };
    const sendTransaction = async (amount, destination) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
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
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const buyTokens = async (contractAddress, contractABI, amount) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
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
        }
        catch (error) {
            uiConsole(error);
            return `Error: ${error.message || error}`;
        }
    };
    const getPrivateKey = async () => {
        try {
            const privateKey = await provider?.request({
                method: "eth_private_key",
            });
            console.log("super secret key --->" + privateKey);
            return privateKey;
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const readContract = async (contractAddress, contractABI) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            uiConsole(contractABI);
            const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);
            // Read message from smart contract
            console.log(signer);
            const message = await contract.getTokens(signer.address);
            const messageStr = message.toString();
            return messageStr;
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const writeContract = async (contractAddress, contractABI, updatedValue) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);
            // Send transaction to smart contract to update message
            const tx = await contract.buyItem(updatedValue);
            // Wait for transactionSmart Contract Interactions to finish
            const receipt = await tx.wait();
            return receipt;
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const sellItems = async (contractAddress, contractABI, updatedValue) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);
            // Send transaction to smart contract to update message
            const value = parseInt(updatedValue);
            const tx = await contract.sellItem(value);
            // Wait for transactionSmart Contract Interactions to finish
            const receipt = await tx.wait();
            return receipt;
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const sellTokens = async (contractAddress, contractABI, updatedValue) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const contract = new ethers.Contract(contractAddress, JSON.parse(JSON.stringify(contractABI)), signer);
            // Send transaction to smart contract to update message
            const value = parseInt(updatedValue);
            const tx = await contract.sellTokens(value);
            // Wait for transactionSmart Contract Interactions to finish
            const receipt = await tx.wait();
            return receipt;
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const readTokens = async (contractAddress, contractABI) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            uiConsole(contractABI);
            const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);
            // Read message from smart contract
            const message = await contract.getTokens(signer.address);
            const messageStr = message.toString();
            return messageStr;
        }
        catch (error) {
            uiConsole(error);
            return error;
        }
    };
    const readItems = async (contractAddress, contractABI) => {
        try {
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            uiConsole(contractABI);
            const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);
            // Read message from smart contract
            const message = await contract.getItems(signer.address);
            const messageStr = message.toString();
            return messageStr;
        }
        catch (error) {
            uiConsole(error);
            return error;
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
//# sourceMappingURL=evmProvider.js.map