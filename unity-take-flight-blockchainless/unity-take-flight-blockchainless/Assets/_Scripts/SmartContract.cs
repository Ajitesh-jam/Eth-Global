//using System.Collections;
//using System.Collections.Generic;
//using UnityEngine;
//using Nethereum;
//using Nethereum.Web3;
//using Nethereum.Util;
//using Nethereum.Signer;
//using Nethereum.Hex.HexConvertors.Extensions;
//using Nethereum.ABI.FunctionEncoding.Attributes;  // Add this for Function and Parameter attributes
//using Nethereum.Hex.HexTypes;
//using Nethereum.Web3.Accounts;
//using System;
//using System.Numerics;
//using Nethereum.Contracts;
//using System.Threading.Tasks;
//using UnityEngine.UI;
//using TMPro;

//public class SmartContract : MonoBehaviour
//{
//    //// Ethereum network URL (Infura or another provider)
//    //private string url = "https://sepolia.infura.io/v3/ffdb629f68d34872bf9d0a5137daf619";

//    //// Contract address and ABI (Application Binary Interface)
//    //private string contractAddress = "0xe1ae950FaA971fe4ac14D681741b7bc8515b8D4D";
//    //string contractABI = "[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_item\",\"type\":\"string\"}],\"name\":\"buyItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"buyTokens\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint16\",\"name\":\"_i\",\"type\":\"uint16\"}],\"name\":\"sellItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokens\",\"type\":\"uint256\"}],\"name\":\"sellTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"internalType\":\"uint16\",\"name\":\"itemIndex\",\"type\":\"uint16\"}],\"name\":\"transferItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_tokens\",\"type\":\"uint256\"}],\"name\":\"transferTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdrawEther\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string[]\",\"name\":\"items\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"price\",\"type\":\"uint256[]\"},{\"internalType\":\"uint16\",\"name\":\"len\",\"type\":\"uint16\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"deployer\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"person\",\"type\":\"address\"}],\"name\":\"getItems\",\"outputs\":[{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"person\",\"type\":\"address\"}],\"name\":\"getTokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";

//    //// Private key (for signing transactions)
//    //public string pvtKey = "29b7647b06a7316436c31887316edf8a954962f0e70da57c0ed8c6017501be62";
//    //public string publicKey = "publicKey";
//    //// Web3 instance
//    //private Web3 web3;

//    //public TextMeshProUGUI tokensText;

//    //public Web3AuthScript TryWeb3;

//    //public BigInteger tokens;
//    //public List<string> items;


//    //private void Start()
//    //{
//    //    pvtKey = TryWeb3.pvtKey;
//    //    publicKey = TryWeb3.publicKey;

        
        
        
//    //    var account = new Account(pvtKey);
//    //    web3 = new Web3(account, url);

//    //    // Start a coroutine to handle async calls
//    //    //StartCoroutine(HandleAsyncCalls());
//    //}

//    //private void Update()
//    //{
//    //    pvtKey = TryWeb3.pvtKey;
//    //    publicKey = TryWeb3.publicKey;
//    //    // Initialize Web3 with an account created using the private key
//    //    //if (TryWeb3.LogCheck == true && check == 0)
//    //    //{
//    //    Debug.Log("Yo pvtkey : " + pvtKey);
//    //    Debug.Log("publicKey : " + publicKey);
//    //    //    check++;
//    //    //}
//    //}

//    //private IEnumerator HandleAsyncCalls()
//    //{
//    //    // Call the coroutine to get tokens
//    //    yield return StartCoroutine(GetTokensCoroutine(publicKey));

//    //    // Example calls (adjust based on your needs)
//    //    //StartCoroutine(CallBuyItem("Astroman"));

//    //    // Uncomment and adjust based on your needs
//    //    // StartCoroutine(CallBuyTokens(0.0005m));  // 1 Ether
//    //    // StartCoroutine(CallSellItem(1));
//    //    // StartCoroutine(CallSellTokens(10));
//    //    // StartCoroutine(CallTransferItem("0xRecipientAddress", 2));
//    //    // StartCoroutine(CallTransferTokens("0xRecipientAddress", 100));
//    //    // StartCoroutine(CallWithdrawEther(1));  // Withdraw 1 Ether
//    //    // StartCoroutine(CallGetItems("publicKey"));
//    //    // StartCoroutine(CallDeployer());
//    //    // StartCoroutine(CallGetItems("publicKey"));
//    //}
//    //public void RefreshTokens()
//    //{
//    //    CallGetTokens(publicKey);


//    //}

//    //private IEnumerator GetTokensCoroutine(string personAddress)
//    //{
//    //    // Await the async method inside the coroutine
//    //    var tokensTask = CallGetTokens(personAddress);
//    //    yield return new WaitUntil(() => tokensTask.IsCompleted);

//    //    if (tokensTask.IsFaulted)
//    //    {
//    //        Debug.LogError("Error calling getTokens: " + tokensTask.Exception.Message);
//    //    }
//    //    else
//    //    {
//c
//    //        Debug.Log("Tokens : " + tokens);
//    //    }
//    //}



//    //private async Task<string> CallGetTokens(string personAddress)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("getTokens");

//    //    try
//    //    {   
//    //        BigInteger tokens = await function.CallAsync<BigInteger>(personAddress);
//    //        Debug.Log("Tokens: " + tokens);

//    //        // Convert tokens (BigInteger) to string
//    //        string tokenString = tokens.ToString();
//    //        return tokenString;
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling getTokens: " + e.Message);
//    //        return null;  // Return null or an appropriate error message in case of failure
//    //    }
//    //}

//    ////1. Call buyItem(string _item)
//    //private async void CallBuyItem(string item)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("buyItem");
//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            new HexBigInteger(2100000),  // Set gas limit (adjust as needed)
//    //            new HexBigInteger(0),  // No Ether sent with this function
//    //            item
//    //        );
//    //        Debug.Log("buyItem transaction receipt: " + receipt);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling buyItem: " + e.Message);
//    //    }
//    //}

//    //[Function("getTokens", "uint256")]
//    //public class GetTokensFunction : //FunctionMessage
//    //{
//    //    [Parameter("address", "person", 1)]
//    //    public string PersonAddress { get; set; }
//    //}

//    //public async void CallGetTokens(string personAddress)
//    //{
//    //    Debug.Log("Call Get Tokens ");
//    //    var getTokensFunction = new GetTokensFunction
//    //    {
//    //        PersonAddress = personAddress
//    //    };

//    //    try
//    //    {
//    //        // Create a handler to query the contract
//    //        var contractHandler = web3.Eth.GetContractQueryHandler<GetTokensFunction>();
//    //        //Debug.Log("Call Get Tokens ");

//    //        // Execute the function to get the result
//    //        tokens = await contractHandler.QueryAsync<BigInteger>(contractAddress, getTokensFunction);

//    //        // Log the result
//    //        Debug.Log("Tokens: " + tokens);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling getTokens: " + e.Message);
//    //    }
//    //}




//    //// 2. Call buyTokens() with Ether (payable)
//    //private async void CallBuyTokens(decimal etherAmount)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("buyTokens");

//    //    // Convert Ether to Wei
//    //    var weiValue = Web3.Convert.ToWei(etherAmount);

//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAndWaitForReceiptAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            gas: new HexBigInteger(210000),  // Gas limit
//    //            value: new HexBigInteger(weiValue)  // Ether amount in Wei
//    //        );
//    //        Debug.Log("buyTokens transaction receipt: " + receipt.TransactionHash);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling buyTokens: " + e.Message);
//    //    }
//    //}

//    //// 3. Call sellItem(uint16 _i)
//    //private async void CallSellItem(ushort itemIndex)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("sellItem");
//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            new HexBigInteger(21000),  // Gas limit
//    //            new HexBigInteger(0),  // No Ether sent
//    //            itemIndex
//    //        );
//    //        Debug.Log("sellItem transaction receipt: " + receipt);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling sellItem: " + e.Message);
//    //    }
//    //}

//    //// 4. Call sellTokens(uint256 _tokens)
//    //private async void CallSellTokens(BigInteger tokens)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("sellTokens");
//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            new HexBigInteger(21000),  // Gas limit
//    //            new HexBigInteger(0),  // No Ether sent
//    //            tokens
//    //        );
//    //        Debug.Log("sellTokens transaction receipt: " + receipt);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling sellTokens: " + e.Message);
//    //    }
//    //}

//    //// 5. Call transferItem(address receiver, uint16 itemIndex)
//    //private async void CallTransferItem(string receiver, ushort itemIndex)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("transferItem");
//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            new HexBigInteger(21000),  // Gas limit
//    //            new HexBigInteger(0),  // No Ether sent
//    //            receiver,
//    //            itemIndex
//    //        );
//    //        Debug.Log("transferItem transaction receipt: " + receipt);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling transferItem: " + e.Message);
//    //    }
//    //}

//    //// 6. Call transferTokens(address receiver, uint256 _tokens)
//    //private async void CallTransferTokens(string receiver, BigInteger tokens)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("transferTokens");
//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            new HexBigInteger(21000),  // Gas limit
//    //            new HexBigInteger(0),  // No Ether sent
//    //            receiver,
//    //            tokens
//    //        );
//    //        Debug.Log("transferTokens transaction receipt: " + receipt);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling transferTokens: " + e.Message);
//    //    }
//    //}

//    //// 7. Call withdrawEther(uint256 amount) (payable)
//    //private async void CallWithdrawEther(decimal etherAmount)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("withdrawEther");

//    //    // Convert Ether to Wei
//    //    var weiValue = Web3.Convert.ToWei(etherAmount);

//    //    try
//    //    {
//    //        var receipt = await function.SendTransactionAndWaitForReceiptAsync(
//    //            web3.TransactionManager.Account.Address,  // Sender's address
//    //            new HexBigInteger(21000),  // Gas limit
//    //            value: new HexBigInteger(weiValue)  // Ether amount in Wei
//    //        );
//    //        Debug.Log("withdrawEther transaction receipt: " + receipt.TransactionHash);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling withdrawEther: " + e.Message);
//    //    }
//    //}
//    // Struct to match the return type of getDetails


//    //[FunctionOutput]
//    //public class Details
//    //{
//    //    [Parameter("uint256", "tokens", 1)]
//    //    public BigInteger tokens { get; set; }

//    //    [Parameter("string[]", "items", 2)]
//    //    public List<string> items { get; set; }

//    //}

//    //// Call getDetails(address person) (view function)
//    //private async void CallGetDetails(string personAddress)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("getDetails");
//    //    try
//    //    {
//    //        var details = await function.CallDeserializingToObjectAsync<Details>(personAddress);
//    //        Debug.Log("Tokens: " + details.tokens);
//    //        //Debug.Log(details);
//    //        if (details.items != null && details.items.Count > 0)
//    //        {
//    //            Debug.Log("Items: " + string.Join(", ", details.items));
//    //        }
//    //        else
//    //        {
//    //            Debug.Log("Items: No items found");
//    //        }
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling getDetails: " + e.Message);
//    //    }
//    //}

//    // 9. Call deployer() (view function)
//    //private async void CallDeployer()
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("deployer");
//    //    try
//    //    {
//    //        string deployerAddress = await function.CallAsync<string>();
//    //        Debug.Log("Deployer Address: " + deployerAddress);
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling deployer: " + e.Message);
//    //    }
//    //}

//    //// Struct to match the return type of getDetails
//    //public class Details
//    //{
//    //    public BigInteger tokens;
//    //    public string[] items;
//    //}

//    //// Call getItems() (view function)
//    //private async void CallGetItems()
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("getItems");
//    //    try
//    //    {
//    //        var items = await function.CallAsync<List<string>>();
//    //        Debug.Log("Items from getItems: " + string.Join(", ", items));
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling getItems: " + e.Message);
//    //    }
//    //}

//    // 1. Call getItems(address personAddress) 
//    //private async void CallGetItems(string personAddress)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("getItems");

//    //    try
//    //    {
//    //        List<string> items = await function.CallAsync<List<string>>(personAddress);
//    //        if (items != null && items.Count > 0)
//    //        {
//    //            Debug.Log("Items: " + string.Join(", ", items));
//    //        }
//    //        else
//    //        {
//    //            Debug.Log("Items: No items found");
//    //        }
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling getItems: " + e.Message);
//    //    }
//    //}

//    // 2. Call getTokens(address personAddress)
//    //private async Task<string> CallGetTokens(string personAddress)
//    //{
//    //    var contract = web3.Eth.GetContract(contractABI, contractAddress);
//    //    var function = contract.GetFunction("getTokens");

//    //    try
//    //    {
//    //        BigInteger tokens = await function.CallAsync<BigInteger>(personAddress);
//    //        Debug.Log("Tokens: " + tokens);

//    //        // Convert tokens (BigInteger) to string
//    //        string tokenString = tokens.ToString();
//    //        return tokenString;
//    //    }
//    //    catch (Exception e)
//    //    {
//    //        Debug.LogError("Error calling getTokens: " + e.Message);
//    //        return null;  // Return null or an appropriate error message in case of failure
//    //    }
//    //}

//}
