import "./App.css";
import { Web3AuthInnerContext, Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contract from "./pages/Contract";
import HomePage from "./pages/HomePage";
// import NFT from "./pages/NFT";
import ServerSideVerification from "./pages/ServerSideVerification";
import Transaction from "./pages/Transaction";
import { Playground } from "./services/playground";
import web3AuthContextConfig from "./services/web3authContext";
function App() {
    return (React.createElement("div", null,
        React.createElement(Web3AuthProvider, { config: web3AuthContextConfig },
            React.createElement(WalletServicesProvider, { context: Web3AuthInnerContext },
                React.createElement(Playground, null,
                    React.createElement(BrowserRouter, null,
                        React.createElement(Routes, null,
                            React.createElement(Route, { path: "/" },
                                React.createElement(Route, { index: true, element: React.createElement(HomePage, null) }),
                                React.createElement(Route, { path: "/contract/:id", element: React.createElement(Contract, null) }),
                                React.createElement(Route, { path: "transaction", element: React.createElement(Transaction, null) }),
                                React.createElement(Route, { path: "server-side-verification", element: React.createElement(ServerSideVerification, null) })))))))));
}
export default App;
//# sourceMappingURL=App.js.map