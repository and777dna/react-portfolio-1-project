import { Button, InputNumber, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;


export default function IncrDecrButtons({ value, setValue, title }) {

    const increment = (e) => {
        e.stopPropagation();
        setValue(Math.min(value + 1, 10))
        //setValue((prevValue) => Math.min(prevValue + 1, 10));
    }
    const decrement = (e) => {
        e.stopPropagation();
        setValue(Math.max(value - 1, 1));
        //setValue((prevValue) => Math.max(prevValue - 1, 1));
    }

    //const { value, increment, decrement } = useCounter()

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