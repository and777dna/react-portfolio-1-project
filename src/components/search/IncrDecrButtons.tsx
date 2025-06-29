import { FC } from "react";
import { Button, InputNumber, Space, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
const { Title } = Typography;

interface IncrDecrButtonsProps {
    value: number;
    setValue: (value: number) => void;
    title?: string;
}


const IncrDecrButtons: FC<IncrDecrButtonsProps> = ({ value, setValue, title }) => {



    const increment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setValue(Math.min(value + 1, 10))
        //setValue((prevValue) => Math.min(prevValue + 1, 10));
    }
    const decrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setValue(Math.max(value - 1, 1));
        //setValue((prevValue) => Math.max(prevValue - 1, 1));
    }


    return <>
        <Title level={5}>{title}</Title>
        <Space size={0} onMouseDown={(e) => e.preventDefault()}>
            <Button
                icon={<MinusOutlined />}
                onClick={decrement}
            />
            <InputNumber
                value={value}
                style={{ width: '80px' }}
                controls={false}
            />
            <Button
                icon={<PlusOutlined />}
                onClick={increment}
            />
        </Space>
    </>
}

export default IncrDecrButtons;
