using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharSelector : MonoBehaviour
{
    // Start is called before the first frame update
    public int currentBusIndex;
    public GameObject[] buses;

    void Start()
    {

        // Get the currently selected bus index from PlayerPrefs, default to 0 if not found

        currentBusIndex = PlayerPrefs.GetInt("SelectedBus", 0);

        // Deactivate all buses
        foreach (GameObject bus in buses)
        {
            bus.SetActive(false);
        }

        // Activate the currently selected bus
        buses[currentBusIndex].SetActive(true);
    }

    // Update is called once per frame
    void Update()
    {
        // You can add any update logic here if needed
        // Get the currently selected bus index from PlayerPrefs, default to 0 if not found

        currentBusIndex = PlayerPrefs.GetInt("SelectedBus", 0);

        // Deactivate all buses
        foreach (GameObject bus in buses)
        {
            bus.SetActive(false);
        }

        // Activate the currently selected bus
        buses[currentBusIndex].SetActive(true);
    }
}
