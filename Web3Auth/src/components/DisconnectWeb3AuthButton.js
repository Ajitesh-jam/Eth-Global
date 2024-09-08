import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import web3AuthLogoWhite from "../assets/web3authLogoWhite.svg";
const DisconnectWeb3AuthButton = () => {
    const { isConnected, logout } = useWeb3Auth();
    if (isConnected) {
        return (React.createElement("div", { className: "flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer", style: { backgroundColor: "#ffd700" }, onClick: () => logout() },
            React.createElement("img", { src: web3AuthLogoWhite, className: "headerLogo" }),
            "Logout"));
    }
    return null;
};
export default DisconnectWeb3AuthButton;
//# sourceMappingURL=DisconnectWeb3AuthButton.js.map