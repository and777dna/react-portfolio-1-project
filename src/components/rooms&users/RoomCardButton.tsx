import {FC} from "react";
import {Button, Space} from "antd";
import React from "react";

interface RoomCardButtonParams {
    customFunction: () => void;
    customText: string;
    buttonType?: "primary" | "default" | "dashed" | "link" | "text";
    buttonSize?: "small" | "middle" | "large";
}

const RoomCardButton: FC<RoomCardButtonParams> = ({ customFunction, customText, buttonType = "default", buttonSize = "middle"}) => {
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

export default RoomCardButton;