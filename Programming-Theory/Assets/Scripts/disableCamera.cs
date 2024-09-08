using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class disableCamera : MonoBehaviour

{

   
     public GameObject cameraObject;

    void Start()
    {
        // Start the coroutine to disable the camera after 5 seconds
        StartCoroutine(DisableCameraAfterDelay());
    }

    IEnumerator DisableCameraAfterDelay()
    {
        // Wait for 5 seconds
        yield return new WaitForSeconds(6f);
        
        // Disable the camera object
        if (cameraObject != null)
        {
            cameraObject.SetActive(false);
        }
    }
}
