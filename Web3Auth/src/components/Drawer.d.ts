import React from "react";
interface DrawerProps {
    isOpen: boolean;
    setOpen: any;
}
declare const Drawer: ({ isOpen, setOpen }: DrawerProps) => React.JSX.Element;
export default Drawer;
