import {Button, ButtonProps, FloatButton, FloatButtonProps} from "antd";
import React from "react";

/*interface CustomButtonParams {
    children: React.ReactNode;//becuse children is ReactNode
    kind?: "form" | "modal" | "card";//kind: string;
    [key: string]: any;//first i made --- ...props:
}*/

interface CustomButtonBaseProps {
    kind?: "form" | "modal" | "card";
    children: React.ReactNode;
}

type CustomButtonProps =
    | ({ kind?: "form" } & ButtonProps)
    | ({ kind: "modal" | "card" } & FloatButtonProps);


const CustomButton: React.FC<CustomButtonBaseProps & CustomButtonProps> = ({children, kind = "form", ...props}) => {
    if (kind === "form") {
        return (
            <Button type="primary" {...(props as ButtonProps)}>
                {children}
            </Button>
        );
    }

    return (
        <FloatButton {...(props as FloatButtonProps)} />
    );
}

export default CustomButton;