import { Button, FloatButton } from "antd";

//form/float button
export default function CustomButton({children, kind = "form", ...props}) {
    const Component = kind === "form" ? Button : FloatButton;
    // Определяем дополнительные пропсы заранее
    const extraProps = kind === "form" ? { type: "primary" } : { onClick: props.onClick };

    return <Component {...extraProps} {...props}>
        {children}
    </Component>
}