import RoomsList from "./RoomsList";

const items = ( categorizedRooms, addReservation, deleteReservation ) => [
    {
        key: "1",
        label: "City",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.City} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
    {
        key: "2",
        label: "Beach",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.Beach} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
    {
        key: "3",
        label: "Outdoors",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.Outdoors} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
];

export default items;