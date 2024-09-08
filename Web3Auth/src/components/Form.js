import React from "react";
function Form({ heading, headingCenter, formDetails, children }) {
    return (React.createElement("div", { className: "w-11/12 px-4 sm:px-6 lg:px-8  z-0" },
        React.createElement("p", { className: `text-lg font-bold ${headingCenter ? "text-center" : ""}` }, heading),
        React.createElement("div", { className: "p-8 mt-6 mb-0 space-y-4 rounded-lg bg-white" },
            React.createElement("form", { action: "", className: "pb-6" }, formDetails.map((formDetail) => (React.createElement("div", { key: formDetail.label },
                React.createElement("label", { className: "text-sm font-medium" }, formDetail.label),
                React.createElement("div", { className: "relative mt-1" }, formDetail.onChange ? (React.createElement("input", { type: "email", id: "email", className: "w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm  z-0", value: formDetail.input, onChange: (e) => {
                        formDetail.onChange(e.target.value);
                    } })) : (React.createElement("input", { type: "email", id: "email", className: "w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm  z-0", value: formDetail.input, ...(formDetail.readOnly ? { readOnly: true } : {}) }))))))),
            children)));
}
export default Form;
//# sourceMappingURL=Form.js.map