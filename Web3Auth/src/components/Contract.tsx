import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useEffect, useState } from "react";
import { Params, useParams } from 'react-router-dom';
import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
// import SourceCode from "../components/SourceCode";
import Tabs from "../components/Tabs";
import ABI from "../config/ABI.json";
import { usePlayground } from "../services/playground";

function Contract() {
  const [abi] = useState<string>(JSON.stringify(ABI));
  const [contractValue, setContractValue] = useState<string>("");
  const [address] = useState("0xe1ae950FaA971fe4ac14D681741b7bc8515b8D4D");
  const [loading, setLoading] = useState(false);
  const { id } = useParams<Params>(); // Extract the 'id' from the URL

  const [tab, setTab] = useState("deploy");

  useEffect(() => {
    console.log("id:"+id)
    if (id) {
      console.log("id:"+id)
      setContractValue(id);
    }
  }, [id]);

  const LoaderButton = ({ ...props }) => (
    <button {...props}>
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.children}
    </button>
  );

  const { writeContract,readItems,readTokens, sellItem, sellTokens, buyTokens } = usePlayground();
  const { isConnected } = useWeb3Auth();

  const formDetailsWrite = [
    {
      label: "Item Name",
      input: contractValue as string,
      onChange: setContractValue,
    },
  ];

  const formSellItem = [
    {
      label: "Item index",
      input: contractValue,
      onChange: setContractValue,
    },
  ];

  const formBuyTokens = [
    {
      label: "Ether (1 ETH = 100,000)",
      input: contractValue,
      onChange: setContractValue,
    }
  ];

  const formSellTokens = [
    {
      label: "Token Count",
      input: contractValue,
      onChange: setContractValue,
    },
  ];

  const TabData = [
    
    {
      tabName: "Read Tokens",
      onClick: () => setTab("readTokens"),
      active: tab === "readTokens",
    }, 
    {
      tabName: "Buy Tokens",
      onClick: () => setTab("buyTokens"),
      active: tab === "buyTokens",
    },   
    {
      tabName: "Sell Tokens",
      onClick: () => setTab("sellTokens"),
      active: tab === "sellTokens",
    },    
    {
      tabName: "Read Items",
      onClick: () => setTab("readItems"),
      active: tab === "readItems",
    },
    {
      tabName: "Buy Item",
      onClick: () => setTab("write"),
      active: tab === "write",
    },
    {
      tabName: "Sell Items",
      onClick: () => setTab("sellItems"),
      active: tab === "sellItems",
    },
  ];

  return (
    <main className="flex flex-col h-screen z-0">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {isConnected ? (
          <>
            <Sidebar />
            <div className="w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
              <h1 className="w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl">Smart Contract Interactions</h1>
              <Tabs tabData={TabData} />
              {tab === "readTokens" ? (
                  <LoaderButton
                    className=" mfullt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                    style={{ backgroundColor: "#ffd700" }}
                    onClick={() => {
                      setLoading(true);
                      readTokens(address, abi);
                      setLoading(false);
                    }}
                  >
                    Read Tokens
                  </LoaderButton>
              ) : null}
              {tab === "readItems" ? (
                  <LoaderButton
                    className="w mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                    style={{ backgroundColor: "#ffd700" }}
                    onClick={() => {
                      setLoading(true);
                      readItems(address, abi);
                      setLoading(false);
                    }}
                  >
                    Read Items
                  </LoaderButton>
              ) : null}
              {tab === "write" ? (
                <Form formDetails={formDetailsWrite}>
                  <LoaderButton
                    className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                    style={{ backgroundColor: "#ffd700" }}
                    onClick={() => {
                      setLoading(true);
                      writeContract(address, abi, contractValue);
                      setLoading(false);
                    }}
                  >
                    Buy Item
                  </LoaderButton>
                </Form>
              ) : null}
              {tab === "sellItems" ? (
                <Form formDetails={formSellItem}>
                  <LoaderButton
                    className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                    style={{ backgroundColor: "#ffd700" }}
                    onClick={() => {
                      setLoading(true);
                      sellItem(address, abi, contractValue);
                      setLoading(false);
                    }}
                  >
                    Sell Items
                  </LoaderButton>
                </Form>
              ) : null}
              {tab === "sellTokens" ? (
                <Form formDetails={formSellTokens}>
                  <LoaderButton
                    className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                    style={{ backgroundColor: "#ffd700" }}
                    onClick={() => {
                      setLoading(true);
                      sellTokens(address, abi, contractValue);
                      setLoading(false);
                    }}
                  >
                    Sell Tokens
                  </LoaderButton>
                </Form>
              ) : null}
              {tab === "buyTokens" ? (
                <Form formDetails={formBuyTokens}>
                  <LoaderButton
                    className="w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white"
                    style={{ backgroundColor: "#ffd700" }}
                    onClick={() => {
                      setLoading(true);
                      buyTokens(address, abi, contractValue);
                      setLoading(false);
                    }}
                  >
                    Buy Tokens
                  </LoaderButton>
                </Form>
              ) : null}
              <Console />
            </div>
          </>
        ) : (
          <NotConnectedPage />
        )}
      </div>
    </main>
  );
}

export default Contract;
