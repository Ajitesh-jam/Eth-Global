import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
const Sidebar = () => {
    const navigate = useNavigate();
    function goToHome() {
        navigate("/");
    }
    function goToTransaction() {
        navigate("/transaction");
    }
    function goToContract() {
        navigate("/contract/Welcome");
    }
    const location = useLocation();
    function linktoGo(label, path, id) {
        return (React.createElement("div", { onClick: () => path(), key: id, className: "flex items-center px-4 py-2 mb-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-primary  cursor-pointer" },
            React.createElement("span", { className: "text-sm font-normal" }, label)));
    }
    function activePage(label, id) {
        return (React.createElement("div", { key: id, className: "flex items-center px-4 py-2 mb-2 rounded-lg bg-gray-100 text-primary cursor-pointer" },
            React.createElement("span", { className: "text-sm font-bold" }, label)));
    }
    return (React.createElement("div", { className: "flex flex-col justify-between h-screen bg-white border-r w-64 p-5 lg:flex hidden" },
        React.createElement("div", { className: "py-3" },
            React.createElement("strong", { className: "px-4 block p-1 text-xs font-medium text-gray-400 uppercase" }, "MENU"),
            React.createElement("nav", { className: "flex flex-col mt-6" },
                location.pathname === "/" ? activePage("Home", 1) : linktoGo("Home", goToHome, 1),
                location.pathname === "/transaction" ? activePage("Send ETH", 2) : linktoGo("Send ETH", goToTransaction, 2),
                location.pathname.startsWith("/contract")
                    ? activePage("Shop", 3)
                    : linktoGo("Shop", goToContract, 3))),
        React.createElement(UserProfile, null)));
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map