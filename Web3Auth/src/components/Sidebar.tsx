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
  function linktoGo(label: string, path: any, id: number) {
    return (
      <div
        onClick={() => path()}
        key={id}
        className="flex items-center px-4 py-2 mb-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-primary  cursor-pointer"
      >
        <span className="text-sm font-normal">{label}</span>
      </div>
    );
  }
  function activePage(label: string, id: number) {
    return (
      <div key={id} className="flex items-center px-4 py-2 mb-2 rounded-lg bg-gray-100 text-primary cursor-pointer">
        <span className="text-sm font-bold">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-screen bg-white border-r w-64 p-5 lg:flex hidden">
      <div className="py-3">
        <strong className="px-4 block p-1 text-xs font-medium text-gray-400 uppercase">MENU</strong>
        <nav className="flex flex-col mt-6">
          {location.pathname === "/" ? activePage("Home", 1) : linktoGo("Home", goToHome, 1)}
          {location.pathname === "/transaction" ? activePage("Send ETH", 2) : linktoGo("Send ETH", goToTransaction, 2)}
          {location.pathname.startsWith("/contract")
            ? activePage("Shop", 3)
            : linktoGo("Shop", goToContract, 3)}
        </nav>
      </div>
      <UserProfile />
    </div>
  );
};
export default Sidebar;
