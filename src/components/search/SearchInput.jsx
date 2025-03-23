import { Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import IncrDecrButtons from "./IncrDecrButtons";

export default function SearchInput() {

    const [value, setValue] = useState([3, 5, 7])
    const [resultOfOptions, setResultOfOptions] = useState("")

    useEffect(() => {
        setResultOfOptions(`adults ${value[0]} children ${value[1]} rooms ${value[2]}`)
        console.log("resultOfOptions:", resultOfOptions)
    }, [value]); //it is not changing because of "e.stopPropagation();" and "onMouseDown"

    // Function to update specific index in the array
    const updateValue = (index, newValue) => {
        setValue((prev) => {
            const updated = [...prev]; // Copy previous array
            updated[index] = newValue; // Update specific index
            return updated;
        });
    };

    //let resultOfOptions = "adults " + value[0] + " children " + value[1] + " rooms " + value[2];

    const options = useMemo(() => [
        { value: "Adults", label: <IncrDecrButtons title="Adults" value={value[0]} setValue={(newVal) => updateValue(0, newVal)}/> },
        { value: "Children", label: <IncrDecrButtons title="Children" value={value[1]} setValue={(newVal) => updateValue(1, newVal)}/> },
        { value: "Rooms", label: <IncrDecrButtons title="Rooms" value={value[2]} setValue={(newVal) => updateValue(2, newVal)}/> },
    ], [value]);

    return <Input.Group compact style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Input placeholder="Введите текст" style={{ width: "30%" }} />
        <Select
            // defaultValue="lucy"
            //defaultValue={resultOfOptions}
            value={resultOfOptions}
            style={{ width: "25%" }}
            options={options}
        />



        <Button type="primary" icon={<SearchOutlined />} />
    </Input.Group>
}