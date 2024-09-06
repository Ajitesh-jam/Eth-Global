using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShopManager : MonoBehaviour
{
    public CharacterManager characterManager;
    public int currentBusIndex = 0;
    public GameObject[] busModels;
    public GameObject ShopCamera;
    public GameObject ShopPanel;
    public GameObject LoginPanel;

    public BusBlueprint[] Buses;

    // Start is called before the first frame update
    void Start()
    {
        currentBusIndex = PlayerPrefs.GetInt("SelectedBus", 0);
        Debug.Log("currentBusIndex" + currentBusIndex);
        foreach (GameObject bus in busModels) bus.SetActive(false);
        busModels[currentBusIndex].SetActive(true);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ChangeNext()
    {
        busModels[currentBusIndex].SetActive(false);
        currentBusIndex++;
        if (currentBusIndex == busModels.Length)
            currentBusIndex = 0;
        busModels[currentBusIndex].SetActive(true);
        PlayerPrefs.SetInt("SelectedBus", currentBusIndex);
    }

    public void ChangePrevious()
    {
        busModels[currentBusIndex].SetActive(false);
        currentBusIndex--;
        if (currentBusIndex == -1)
            currentBusIndex = busModels.Length - 1;
        busModels[currentBusIndex].SetActive(true);
        PlayerPrefs.SetInt("SelectedBus", currentBusIndex);
    }

    public void PlayGame()
    {
        PlayerPrefs.SetInt("SelectedBus", currentBusIndex);
        Debug.Log("Play currentBusIndex" + currentBusIndex);
        ShopCamera.SetActive(false);
        ShopPanel.SetActive(false);
        //this.gameObject.SetActive(false);

        if (characterManager != null)
        {
            characterManager.IsEnabled = true;
        }
        else
        {
            Debug.LogError("CharacterManager reference is missing!");
        }
    }

    public void LoginPlay()
    {
        LoginPanel.SetActive(false);
        ShopPanel.SetActive(true);
    }

}
