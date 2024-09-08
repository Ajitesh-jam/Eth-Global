import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import web3AuthLogoWhite from "../assets/web3authLogoWhite.svg";
const ConnectWeb3AuthButton = () => {
    const { isConnected, connect } = useWeb3Auth();
    if (isConnected) {
        return null;
    }
    return (React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer", style: { backgroundColor: "#ffd700" }, onClick: connect },
        React.createElement("img", { src: web3AuthLogoWhite, className: "headerLogo" }),
        "Connect to Web3Auth"));
};
export default ConnectWeb3AuthButton;
//# sourceMappingURL=ConnectWeb3AuthButton.js.map