using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

using System.Numerics;
using TMPro;

public class GameManager : MonoBehaviour
{
    public enum Cars { Convertible, Pickup, Jumpy, SharkTruck }

    [System.Serializable]
    public class HighscoreData
    {
        public System.TimeSpan convertibleScore;
        public System.TimeSpan pickupScore;
        public System.TimeSpan jumpyScore;
        public System.TimeSpan sharkScore;
    }

    public static GameManager Instance { get; private set; } 
    public static bool IsGameOver { get; set; } 
    public static bool IsGameStarted { get; set; } 

    public Cars choosenCarType;
    //public GameObject player;
    public HighscoreData highscoreData = new HighscoreData();

    // New additions for car ownership and tokens
    public Dictionary<Cars, bool> ownedCars = new Dictionary<Cars, bool>();
    
    
    public SmartContractCaller sc;
    public BigInteger playerTokens ; // Default token count
    public GameObject player;

    public TextMeshProUGUI tokensDisplay;


    

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);

       GameObject web3Auth= GameObject.Find("Web3AuthManager");
        if (web3Auth != null)
        {
            Debug.Log("Found the web3Auth object!");

            // Get the 'SmartContract' script from the 'web3Auth' GameObject
            sc = web3Auth.GetComponent<SmartContractCaller>();

            if (sc != null)
            {
                Debug.Log("SmartContract script found!");
                // Now you can call methods or access properties of the 'SmartContract' script
                // e.g., smartContract.SomeMethod();
            }
            else
            {
                Debug.LogError("SmartContract script not found on web3Auth!");
            }
        }

        // Initialize car ownership
        InitializeCarOwnership();

        sc.CallGetTokens(sc.playerPublicAddress);
        Debug.Log("Tokens from Game Manger : " + sc.tokens.ToString());

        tokensDisplay.text = "Tokens : "+sc.tokens.ToString();

    }

    public void Reload() {
        Debug.Log("reloading....");
        InitializeCarOwnership();
        sc.CallGetTokens(sc.playerPublicAddress);
        Debug.Log("Refreshed Tokens from Game Manger : " + sc.tokens.ToString());
        tokensDisplay.text = "Tokens : " + sc.tokens.ToString();
        //SceneManager.LoadScene(1);
        sc.CallGetItems(sc.playerPublicAddress);
        enable();
       
    }

    public void enable()
    {
        
        Debug.Log("Enable Skins of Address : " + sc.playerPublicAddress);
        Debug.Log("Enable items: " + sc.items);

        for (int i = 0; i < sc.items.Count; i++)
        {
            string carToEnable = sc.items[i];
            if (carToEnable == "Jumpy") {
                ownedCars[Cars.Jumpy] = true;
            }
            else if (carToEnable == "Pickup") {
                ownedCars[Cars.Pickup] = true;
            }
            else if (carToEnable == "SharkTruck") {
                ownedCars[Cars.SharkTruck] = true;
            }
            else
            {

            }
        }
    }

    private void InitializeCarOwnership()
    {
        // Convertible is owned by default, others need to be purchased
        ownedCars[Cars.Convertible] = true;
        ownedCars[Cars.Pickup] = false;
        ownedCars[Cars.Jumpy] = false;
        ownedCars[Cars.SharkTruck] = false;

        enable();
       
    }

    public bool IsSelectedVehicle(Cars cRef)
    { // ABSTRACTION
        return cRef == choosenCarType;
    }

    private bool IsScoreLowerThan(System.TimeSpan score1, System.TimeSpan score2)
    { // ABSTRACTION
        return score1 < score2;
    }

    public void SaveHighscore(System.TimeSpan score, Cars cRef)
    { // ABSTRACTION
        HighscoreData data = highscoreData;

        switch (cRef)
        {
            case Cars.Convertible:
                if (highscoreData.convertibleScore == new System.TimeSpan() ||
                    IsScoreLowerThan(score, highscoreData.convertibleScore))
                    data.convertibleScore = score;
                break;
            case Cars.Pickup:
                if (highscoreData.pickupScore == new System.TimeSpan() ||
                    IsScoreLowerThan(score, highscoreData.pickupScore))
                    data.pickupScore = score;
                break;
            case Cars.Jumpy:
                if (highscoreData.jumpyScore == new System.TimeSpan() ||
                    IsScoreLowerThan(score, highscoreData.jumpyScore))
                    data.jumpyScore = score;
                break;
            case Cars.SharkTruck:
                if (highscoreData.sharkScore == new System.TimeSpan() ||
                    IsScoreLowerThan(score, highscoreData.sharkScore))
                    data.sharkScore = score;
                break;
        }

        highscoreData = data;
    }

   
}
