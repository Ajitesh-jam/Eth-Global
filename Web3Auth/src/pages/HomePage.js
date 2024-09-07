import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import AccountDetails from "../components/AccountDetails";
import Console from "../components/Console";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
import SourceCode from "../components/SourceCode";
function HomePage() {
    const { isConnected } = useWeb3Auth();
    return (React.createElement("main", { className: "flex flex-col h-screen z-0" },
        React.createElement(Header, null),
        React.createElement("div", { className: "flex flex-1 overflow-hidden" }, isConnected ? (React.createElement(React.Fragment, null,
            React.createElement(Sidebar, null),
            React.createElement("div", { className: " w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll" },
                React.createElement("h1", { className: "w-11/12 px-4 pt-16 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl" }, "Welcome to CGS Metaverse"),
                React.createElement(AccountDetails, null),
                React.createElement(Console, null),
                React.createElement(SourceCode, null)))) : (React.createElement(NotConnectedPage, null)))));
}
export default HomePage;
//# sourceMappingURL=HomePage.js.map