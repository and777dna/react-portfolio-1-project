import { FC } from "react";
import { Card } from "antd";
import RoomCard from "./RoomCard"
import React from "react";

interface Room {
    id: string | number;
}

interface RoomsListParams {
    categorizedRooms: Room[],
    addReservation: () => void,
    deleteReservation: () => void
}

const RoomsList: FC<RoomsListParams> = ({ categorizedRooms, addReservation, deleteReservation }) => {
    return <Card>
        <ul style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: 0 }}>
            {categorizedRooms.map((room) => (
                <li key={room.id} style={{ listStyle: "none", width: "360px", padding: "20px" }}>
                    <RoomCard//TODO: TTTTT
                        room={room}
                        addReservation={addReservation}
                        deleteReservation={deleteReservation}
                    />
                </li>
            ))}
        </ul>
    </Card>
}

export default RoomsList