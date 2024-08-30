using System;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Newtonsoft.Json;

public class Web3custom : MonoBehaviour
{
  Web3Auth web3Auth;

  // Start is called before the first frame update
  void Start()
  {
    web3Auth = GetComponent<Web3Auth>();
    web3Auth.setOptions(new Web3AuthOptions()
    {
      redirectUrl = new Uri("https://drive.google.com/drive/folders/1qBPTmdApfAJwoYG_t7XdX5pLlDYuYwb_"),
      clientId = "BO74GpUIUetf2I62CGByLtLKRbSIMDSuZn1RhdEME8Y6zW0MjeeVGdq6cE0raA9Ohx1MjVr60Wvp1XKfCv8sVOw",
      network = Web3Auth.Network.TESTNET,
    });
    web3Auth.onLogin += onLogin;
    web3Auth.onLogout += onLogout;
  }
  public void login() {}
  private void onLogin(Web3AuthResponse response) {}
  public void logout() {}
  private void onLogout() {}
}
