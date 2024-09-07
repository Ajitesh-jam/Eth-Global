import React, { useState } from "react";
const Dropdown = ({ options, displayOptions, rounded, label, onChange, selectedOption }) => {
    const [selection, updateSelection] = useState(selectedOption || options[0]);
    let classSelect;
    if (rounded) {
        classSelect = "w-full pl-4	pr-12 text-sm border-gray-200 rounded-full z-0";
    }
    else {
        classSelect = "w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm z-0";
    }
    const handleChange = async (e) => {
        const { value } = e.target;
        if (onChange)
            await onChange(value);
        if (selectedOption) {
            updateSelection(selectedOption);
        }
        else {
            updateSelection(value);
        }
    };
    return (React.createElement("div", null,
        label ? React.createElement("label", { className: "text-sm font-medium" }, label) : null,
        React.createElement("select", { value: selectedOption || selection, onChange: handleChange, className: classSelect }, options.map((option) => (React.createElement("option", { key: option, value: option }, displayOptions[options.indexOf(option)] || option))))));
};
export default Dropdown;
//# sourceMappingURL=DropDown.js.map