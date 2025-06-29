import React, {FC, ReactNode, ChangeEvent, JSX} from "react";
import { Input } from "antd";

interface RoomCardInputItemParams {
    children?: ReactNode;
    placeholder?: string;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RoomCardInputItem: FC<RoomCardInputItemParams> = ({children, placeholder, defaultValue, onChange}) => {
    if (!placeholder && !defaultValue) {
        return <h2>{children}</h2>
    }

    return <Input placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} />
}

export default RoomCardInputItem




type AvailabilityItem = Record<string, string>

// Интерфейс для всей комнаты
interface Room {
    availability: AvailabilityItem[];
}

export function roomsMap(room: Room): JSX.Element {
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