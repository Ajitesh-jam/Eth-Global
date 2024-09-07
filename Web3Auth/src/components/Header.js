import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import Hamburger from "hamburger-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import web3authLogo from "../assets/web3authLogoBlue.svg";
import DisconnectWeb3AuthButton from "./DisconnectWeb3AuthButton";
import Drawer from "./Drawer";
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
const Header = () => {
    const { isConnected } = useWeb3Auth();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    function goToHome() {
        navigate("/");
    }
    return (React.createElement("header", { className: "sticky max-w-screen z-10" },
        React.createElement("div", { className: "px-4 py-4 mx-auto sm:py-2 sm:px-6 md:px-8 border-b" },
            React.createElement("div", { className: "justify-between items-center flex" },
                React.createElement("div", { className: "flex justify-center py-3 flex-row", onClick: () => goToHome() },
                    React.createElement("div", { className: "flex flex-row justify-center items-center" },
                        React.createElement("img", { src: web3authLogo, style: {
                                height: "30px",
                                paddingRight: "15px",
                            } }),
                        React.createElement("div", { className: "border-l-2 text-lg sm:text-xl text-gray-900 px-3 items-center" }, "CGS Metaverse")),
                    React.createElement("div", { className: "flex flex-row justify-center items-center no-underline w-max overflow-hidden flex-wrap m-0 p-0 rounded-lg bg-purple_100 mt-0" })),
                React.createElement("div", { className: "flex-col flex-row mt-0 items-center lg:flex hidden" },
                    React.createElement(DisconnectWeb3AuthButton, null)),
                isConnected && (React.createElement("div", { className: "flex-col flex-row mt-0 items-center flex lg:hidden" },
                    React.createElement(Hamburger, { toggled: isOpen, toggle: setOpen, size: 25, direction: "right" }))))),
        isConnected && (React.createElement("div", { className: `ease-in-out duration-300 ${isOpen ? "opacity-100" : "opacity-0"}` },
            React.createElement(Drawer, { isOpen: isOpen, setOpen: setOpen })))));
};
export default Header;
//# sourceMappingURL=Header.js.map