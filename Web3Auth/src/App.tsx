import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import './App.css';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK, IProvider } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import RPC from "./ethersRPC"; // Ensure you have the correct RPC implementation
import { providers } from 'web3';

// Web3Auth configuration
const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        if (web3auth.connected) {
          setProvider(web3auth.provider);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const fetchAccountAndBalance = async () => {
      if (provider) {
        try {
          const accounts = await RPC.getAccounts(provider);
          setAccountId(accounts);
          const balance = await RPC.getBalance(provider);
          setBalance(balance);
        } catch (error) {
          console.error("Error fetching account and balance:", error);
        }
      }
    };

    if (provider && loggedIn) {
      fetchAccountAndBalance();
    }
  }, [provider, loggedIn]);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setAccountId(null);
      setBalance(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();
      uiConsole(user);
    } catch (error) {
      console.error("Get User Info error:", error);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const address = await RPC.getAccounts(provider);
      uiConsole(address);
    } catch (error) {
      console.error("Get Accounts error:", error);
    }
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const balance = await RPC.getBalance(provider);
      uiConsole(balance);
    } catch (error) {
      console.error("Get Balance error:", error);
    }
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      const signedMessage = await RPC.signMessage(provider);
      uiConsole(signedMessage);
    } catch (error) {
      console.error("Sign Message error:", error);
    }
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    try {
      uiConsole("Sending Transaction...");
      const transactionReceipt = await RPC.sendTransaction(provider);
      uiConsole(transactionReceipt);
    } catch (error) {
      console.error("Send Transaction error:", error);
    }
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  return (
    <div className="container">
      <Router>
        <nav className="navbar">
          <div className="brand">Web3Auth</div>
          <ul>
            <li><NavLink to="/" >Home</NavLink></li>
            <li><NavLink to="/myprofile" >MyProfile</NavLink></li>
          </ul>
          <div className="auth-info">
            {accountId && <span className="account-id">{accountId}</span>}
            {balance && <span className="balance">{balance} ETH</span>}
          </div>
          <div className="auth-container">
            {loggedIn ? (
              <button onClick={logout} className="auth-button">Logout</button>
            ) : (
              <button onClick={login} className="auth-button">Login</button>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/myprofile" 
            element={
              <MyProfile 
                loggedIn={loggedIn} 
                getUserInfo={getUserInfo} 
                getAccounts={getAccounts}
                getBalance={getBalance}
                signMessage={signMessage}
                sendTransaction={sendTransaction}
                logout={logout}
              />
            } 
          />
        </Routes>
      </Router>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default App;
