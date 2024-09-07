import React from "react";
function renderTab(tabName, onClick, active) {
    if (active) {
        return (React.createElement("a", { onClick: onClick, className: "p-4 text-lg font-bold -mb-px border-b-2 border-current text-primary cursor-pointer" }, tabName));
    }
    return (React.createElement("a", { onClick: onClick, className: "p-4 text-lg font-bold -mb-px border-b border-transparent hover:text-primary cursor-pointer" }, tabName));
}
function Tabs({ tabData }) {
    return (React.createElement("nav", { className: "w-11/12 px-4 sm:px-6 lg:px-8 flex text-sm font-medium border-b border-gray-100" }, tabData.map((tab) => renderTab(tab.tabName, tab.onClick, tab.active))));
}
export default Tabs;
//# sourceMappingURL=Tabs.js.map