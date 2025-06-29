import { Input } from "antd";

export default function RoomCardInputItem(props) {
    const { children } = props;
    const placeholder = props.placeholder || null;
    const defaultValue = props.defaultValue || null;

    if (!placeholder && !defaultValue) {
        return <h2>{children}</h2>
    }

    return <Input placeholder={placeholder} defaultValue={defaultValue} onChange={props.onChange} />
}

export function roomsMap(room) {
    return <li>
        {room.availability.map((keyOfValue) => {
            const value = Object.values(keyOfValue)
            const key = Object.keys(keyOfValue)//TODO: TTTTT
            const keyValue = Object.entries(keyOfValue)//TODO:to add like [key, value] in

            /*console.log("value:", value, typeof (value), Object.values(keyOfValue), Object.entries(keyOfValue))
            console.log("keyValue:", keyValue)*/
            return <>
                {/*<h3>{value}</h3>*/}
                <h3>{key}: {value}</h3>
            </>
            // return { value }
        })}
    </li>
}