import { useMemo } from "react";

export const useCategorizedRooms = ({ roomsData }) => {
    const categorizedRooms = useMemo(() => {
        return {
            City: roomsData.filter(room => room.category.includes("City")),
            Beach: roomsData.filter(room => room.category.includes("Beach")),
            Outdoors: roomsData.filter(room => room.category.includes("Outdoors"))
        };
    }, [roomsData]);

    return categorizedRooms;
}