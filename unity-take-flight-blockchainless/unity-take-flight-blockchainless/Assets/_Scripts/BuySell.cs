using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

[System.Serializable] // This makes the struct visible in the Inspector
public struct ComponentData
{
    public ulong tokens;       // Equivalent to uint256
    public string[] items;     // Array of strings
}

public class BuySell : MonoBehaviour
{

    public Web3AuthScript TryWeb3;
    public GameObject BuyButton;
    public GameObject SellButton;

    // Map of bus names to prices
    public Dictionary<string, int> busPriceMap = new Dictionary<string, int>();

    public TMP_Text buyButtonText;
    public TMP_Text sellButtonText;

    // Public ComponentData for tokens and owned items
    public ComponentData componentData;

    // URL to redirect to
    public string url = "http://localhost:5173/contract/";

    // Call this method to redirect to the URL
    public void RedirectToURL()
    {
        url += "Doom";
        Application.OpenURL(url);
    }

    void Start()
    {
        // Example of adding values to the busPriceMap
        busPriceMap.Add("Doom", 500);
        busPriceMap.Add("Astroman", 200);
        busPriceMap.Add("SilverSurfer", 300);

        // Update the buy/sell buttons based on the selected bus index
        UpdateBuySellButtons();
    }

    // Method to update the buy and sell buttons based on bus ownership
    public void UpdateBuySellButtons()
    {
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
        if (componentData.items != null && IsItemOwned(busName))
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
        foreach (var item in componentData.items)
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
