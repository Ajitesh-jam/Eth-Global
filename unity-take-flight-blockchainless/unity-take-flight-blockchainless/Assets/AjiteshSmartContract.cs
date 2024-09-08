using System;
using System.Numerics;
using UnityEngine;
using Nethereum.Web3;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using System.Collections.Generic;
using UnityEngine.UI;
using TMPro;

public class AjiteshSmartContract : MonoBehaviour
{
    // Ethereum network URL (Infura or another provider)
    private string url = "https://sepolia.infura.io/v3/1cbe7b7bfc1241ff801c647dbeb52815";

    // The smart contract address
    private string contractAddress = "0xe1ae950FaA971fe4ac14D681741b7bc8515b8D4D";


    string contractABI = "[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_item\",\"type\":\"string\"}],\"name\":\"buyItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"buyTokens\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint16\",\"name\":\"_i\",\"type\":\"uint16\"}],\"name\":\"sellItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokens\",\"type\":\"uint256\"}],\"name\":\"sellTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"internalType\":\"uint16\",\"name\":\"itemIndex\",\"type\":\"uint16\"}],\"name\":\"transferItem\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_tokens\",\"type\":\"uint256\"}],\"name\":\"transferTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdrawEther\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string[]\",\"name\":\"items\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"price\",\"type\":\"uint256[]\"},{\"internalType\":\"uint16\",\"name\":\"len\",\"type\":\"uint16\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"deployer\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"person\",\"type\":\"address\"}],\"name\":\"getItems\",\"outputs\":[{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"person\",\"type\":\"address\"}],\"name\":\"getTokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";

    // Web3 instance
    private Web3 web3;


    public TextMeshProUGUI tokensText;
    public Web3AuthScript TryWeb3;

    public string pvtKey = "29b7647b06a7316436c31887316edf8a954962f0e70da57c0ed8c6017501be62";
    public string publicKey = "0x48992335F175AD1dc8eaB5eEa612a9436d23CB9c";

    public BigInteger tokens;
    public List<string> items;
    public string playerPublicAddress;

    public GameObject BuyButton;
    public GameObject SellButton;

    // Map of bus names to prices
    public Dictionary<string, int> busPriceMap = new Dictionary<string, int>();

    public TMP_Text buyButtonText;
    public TMP_Text sellButtonText;

    private void Start()
    {
        // Initialize the Web3 instance
        // Example of adding values to the busPriceMap
        busPriceMap.Add("Doom", 500);
        busPriceMap.Add("Astroman", 200);
        busPriceMap.Add("SilverSurfer", 300);

        pvtKey = TryWeb3.pvtKey;
        publicKey = TryWeb3.publicKey;
        //publicKey = "0x48992335F175AD1dc8eaB5eEa612a9436d23CB9c";
        web3 = new Web3(url);

        DontDestroyOnLoad(gameObject);

        // Example calls (comment/uncommfent based on use case)
        //CallBuyItem("Sword");
        //CallBuyTokens(1.0m);
        //CallSellItem(1);
        //CallSellTokens(10);
        //CallTransferItem("0xRecipientAddress", 2);
        //CallTransferTokens("0xRecipientAddress", 100);
        //CallWithdrawEther(1);
        //CallGetDetails("0x05b3DF12a3092828E727e9E15944Dcca01dCb367");

        //CallGetTokens(publicKey);

        //CallGetItems("0x05b3DF12a3092828E727e9E15944Dcca01dCb367");
        ////CallDeployer();
        ///

    }

    [Function("getTokens", "uint256")]
    public class GetTokensFunction : FunctionMessage
    {
        [Parameter("address", "person", 1)]
        public string PersonAddress { get; set; }
    }

    public async void CallGetTokens()
    {

        pvtKey = TryWeb3.pvtKey;
        publicKey = TryWeb3.publicKey;
        publicKey = "0x131F166e3a3b2Ad8D14F883be2d65ebdDD5220A6";
        Debug.Log("Call Get Tokens ");
        var getTokensFunction = new GetTokensFunction
        {
            PersonAddress = publicKey
        };

        try
        {
            // Create a handler to query the contract
            var contractHandler = web3.Eth.GetContractQueryHandler<GetTokensFunction>();

            // Execute the function to get the result
            tokens = await contractHandler.QueryAsync<BigInteger>(contractAddress, getTokensFunction);

            // Log the result
            Debug.Log("Tokens: " + tokens);

            // Update the tokensText UI element with the retrieved token amount
            tokensText.text = "Tokens: " + tokens.ToString();
        }
        catch (Exception e)
        {
            Debug.LogError("Error calling getTokens: " + e.Message);
        }
    }



    // 9. Call deployer() (view function)
    private async void CallDeployer()
    {
        var contract = web3.Eth.GetContract(contractABI, contractAddress);
        var function = contract.GetFunction("deployer");
        try
        {
            string deployerAddress = await function.CallAsync<string>();
            Debug.Log("Deployer Address: " + deployerAddress);
        }
        catch (Exception e)
        {
            Debug.LogError("Error calling deployer: " + e.Message);
        }
    }

    // Struct to match the return type of getDetails

    [FunctionOutput]
    public class Details
    {
        public BigInteger Tokens { get; set; }
        public List<string> Items { get; set; }
    }



    [Function("getItems", "string[]")]
    public class GetItemsFunction : FunctionMessage
    {
        [Parameter("address", "person", 1)]
        public string PersonAddress { get; set; }
    }
    public async void CallGetItems()
    {
        publicKey = "";
        var contract = web3.Eth.GetContract(contractABI, contractAddress);
        var function = contract.GetFunction("getItems");

        Debug.Log("Call Get items ");

        try
        {
            // Call the function and return the result as a string array
            items = await function.CallAsync<List<string>>(publicKey);

            // Check if items were retrieved and log them
            if (items != null && items.Count > 0)
            {
                Debug.Log("Items: " + string.Join(", ", items));
            }
            else
            {
                Debug.Log("No items found for this address.");
            }
        }
        catch (Exception e)
        {
            Debug.LogError("Error calling getItems: " + e.Message);
        }
    }

    // Method to update the buy and sell buttons based on bus ownership
    public void UpdateBuySellButtons()
    {
        CallGetItems();
        int currentBusIndex = PlayerPrefs.GetInt("SelectedBus", 0);
        string busName = GetBusName(currentBusIndex);


        // Special case for default character at index 0
        if (currentBusIndex == 0)
        {
            buyButtonText.text = "Owned";
            BuyButton.SetActive(true);
            SellButton.SetActive(false); // No SellButton for the default character
            return; // Exit the method early for index 0
        }

        // For other buses
        if (items != null && IsItemOwned(busName))
        {
            // If the item is owned, disable BuyButton and enable SellButton
            BuyButton.SetActive(false);
            SellButton.SetActive(true);
            sellButtonText.text = $"SELL: {busPriceMap[busName]}";
        }
        else
        {
            // If the item is not owned, enable BuyButton and disable SellButton
            BuyButton.SetActive(true);
            SellButton.SetActive(false);

            if (busPriceMap.ContainsKey(busName))
            {
                buyButtonText.text = $"BUY: {busPriceMap[busName]}";
            }
            else
            {
                buyButtonText.text = "Not Available";
            }
        }
    }

    // Helper function to check if an item is owned
    private bool IsItemOwned(string busName)
    {
        foreach (var item in items)
        {
            if (item == busName)
            {
                return true;
            }
        }
        return false;
    }

    // Function to get bus name from index (this should match your actual data)
    private string GetBusName(int index)
    {
        switch (index)
        {
            case 1: return "Doom";
            case 2: return "Astroman";
            case 3: return "SilverSurfer";
            default: return "Unknown";
        }
    }


}
