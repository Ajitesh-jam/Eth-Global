import { FC } from "react";
interface DropdownProps {
    options: string[];
    displayOptions?: string[];
    rounded?: boolean;
    label?: string;
    selectedOption?: string;
    onChange?: (value: string) => void;
}
declare const Dropdown: FC<DropdownProps>;
export default Dropdown;
