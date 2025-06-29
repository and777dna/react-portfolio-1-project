import { Button, Space } from "antd";

export default function RoomCardButton(props) {
    const customFunction = props.customFunction;
    const customText = props.customText;
    const buttonType = props.buttonType;
    const buttonSize = props.buttonSize;

    return <Space>
        <Button
            /*type="primary"
            size="small"*/
            type={buttonType}
            size={buttonSize}
            onClick={customFunction}
        >
            {/*Create new user*/}
            {customText}
        </Button>
    </Space>
}