import { JSX } from "react";
interface FormProps {
    heading?: string;
    headingCenter?: boolean;
    formDetails: {
        label: string;
        input: string;
        readOnly?: boolean;
        onChange?: any;
    }[];
    children?: JSX.Element | JSX.Element[];
}
declare function MultiForm({ heading, headingCenter, formDetails, children }: FormProps): JSX.Element;
export default MultiForm;
