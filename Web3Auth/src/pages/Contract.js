import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
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
    const [abi] = useState(JSON.stringify(ABI));
    const [contractValue, setContractValue] = useState("");
    const [address] = useState("0xe1ae950FaA971fe4ac14D681741b7bc8515b8D4D");
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); // Extract the 'id' from the URL
    const [tab, setTab] = useState("deploy");
    useEffect(() => {
        console.log("id:" + id);
        if (id) {
            console.log("id:" + id);
            setContractValue(id);
        }
    }, [id]);
    const LoaderButton = ({ ...props }) => (React.createElement("button", { ...props },
        loading && (React.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
            React.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            React.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }))),
        props.children));
    const { writeContract, readItems, readTokens, sellItem, sellTokens, buyTokens } = usePlayground();
    const { isConnected } = useWeb3Auth();
    const formDetailsWrite = [
        {
            label: "Item Name",
            input: contractValue,
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
    return (React.createElement("main", { className: "flex flex-col h-screen z-0" },
        React.createElement(Header, null),
        React.createElement("div", { className: "flex flex-1 overflow-hidden" }, isConnected ? (React.createElement(React.Fragment, null,
            React.createElement(Sidebar, null),
            React.createElement("div", { className: "w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll" },
                React.createElement("h1", { className: "w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl" }, "Smart Contract Interactions"),
                React.createElement(Tabs, { tabData: TabData }),
                tab === "readTokens" ? (React.createElement(LoaderButton, { className: " mfullt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: () => {
                        setLoading(true);
                        readTokens(address, abi);
                        setLoading(false);
                    } }, "Read Tokens")) : null,
                tab === "readItems" ? (React.createElement(LoaderButton, { className: "w mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: () => {
                        setLoading(true);
                        readItems(address, abi);
                        setLoading(false);
                    } }, "Read Items")) : null,
                tab === "write" ? (React.createElement(Form, { formDetails: formDetailsWrite },
                    React.createElement(LoaderButton, { className: "w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: () => {
                            setLoading(true);
                            writeContract(address, abi, contractValue);
                            setLoading(false);
                        } }, "Buy Item"))) : null,
                tab === "sellItems" ? (React.createElement(Form, { formDetails: formSellItem },
                    React.createElement(LoaderButton, { className: "w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: () => {
                            setLoading(true);
                            sellItem(address, abi, contractValue);
                            setLoading(false);
                        } }, "Sell Items"))) : null,
                tab === "sellTokens" ? (React.createElement(Form, { formDetails: formSellTokens },
                    React.createElement(LoaderButton, { className: "w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: () => {
                            setLoading(true);
                            sellTokens(address, abi, contractValue);
                            setLoading(false);
                        } }, "Sell Tokens"))) : null,
                tab === "buyTokens" ? (React.createElement(Form, { formDetails: formBuyTokens },
                    React.createElement(LoaderButton, { className: "w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: () => {
                            setLoading(true);
                            buyTokens(address, abi, contractValue);
                            setLoading(false);
                        } }, "Buy Tokens"))) : null,
                React.createElement(Console, null)))) : (React.createElement(NotConnectedPage, null)))));
}
export default Contract;
//# sourceMappingURL=Contract.js.map