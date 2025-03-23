import RoomCard from "./RoomCard";
import { Card } from "antd";

export default function RoomsList({ categorizedRooms, addReservation, deleteReservation }) {
    return <Card>
        <ul style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: 0 }}>
            {categorizedRooms.map((room) => (
                <li key={room.id} style={{ listStyle: "none", width: "360px", padding: "20px" }}>
                    <RoomCard
                        room={room}
                        addReservation={addReservation}
                        deleteReservation={deleteReservation}
                    />
                </li>
            ))}
        </ul>
    </Card>
}