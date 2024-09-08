import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useState } from "react";
import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
import SourceCode from "../components/SourceCode";
import { usePlayground } from "../services/playground";
function Transaction() {
    const { sendTransaction } = usePlayground();
    const { isConnected } = useWeb3Auth();
    const [address, setAddress] = useState("0x10DA906F0bFA5841546E959Eeb1B1e5CE850a6c1");
    const [amount, setAmount] = useState("0.01");
    const [loading, setLoading] = useState(false);
    const LoaderButton = ({ ...props }) => (React.createElement("button", { ...props },
        loading && (React.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
            React.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            React.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }))),
        props.children));
    const formDetailsDestinationAddress = [
        {
            label: "destination address",
            input: address,
            onChange: setAddress,
        },
        {
            label: "amount",
            input: amount,
            onChange: setAmount,
        },
    ];
    return (React.createElement("main", { className: "flex flex-col h-screen z-0" },
        React.createElement(Header, null),
        React.createElement("div", { className: "flex flex-1 overflow-hidden" },
            React.createElement(Sidebar, null),
            isConnected ? (React.createElement("div", { className: " w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll" },
                React.createElement("h1", { className: "w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl" }, "Send ETH"),
                React.createElement(Form, { formDetails: formDetailsDestinationAddress },
                    React.createElement(LoaderButton, { className: "w-full mt-10 mb-0 text-center justify-center items-center flex rounded-full px-6 py-3 text-white", style: { backgroundColor: "#ffd700" }, onClick: async () => {
                            setLoading(true);
                            await sendTransaction(amount, address);
                            setLoading(false);
                        } }, "Send Transaction")),
                React.createElement(Console, null),
                React.createElement(SourceCode, null))) : (React.createElement(NotConnectedPage, null)))));
}
export default Transaction;
//# sourceMappingURL=Transaction.js.map