import React from "react";
import {FC, JSX} from "react";

interface RoomCardInputParams {
    children: JSX.Element;
}

const RoomCardInput: FC<RoomCardInputParams> = ({ children }) => {
    return <div>
        {children}
    </div>
}

export default RoomCardInput;