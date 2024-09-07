import React from "react";
interface TabsProps {
    tabData: {
        tabName: string;
        onClick?: any;
        active?: boolean;
    }[];
}
declare function Tabs({ tabData }: TabsProps): React.JSX.Element;
export default Tabs;
