import React from "react";
import { usePlayground } from "../services/playground";
const Console = () => {
    const { playgroundConsole } = usePlayground();
    return (React.createElement("div", { className: "py-16 w-11/12 px-4 py-16 sm:px-6 lg:px-8 flex-col" },
        React.createElement("p", { className: "text-lg font-bold" }, "Console"),
        React.createElement("div", { className: "justify-center p-8 mt-6 mb-0 space-y-4 rounded-lg bg-white" },
            React.createElement("div", { className: "md:flex items-flex-start p-1 bg-gray-200 overflow-scroll max-h-72" },
                React.createElement("pre", { className: "font-mono overflow-scroll w-full" }, playgroundConsole)))));
};
export default Console;
//# sourceMappingURL=Console.js.map