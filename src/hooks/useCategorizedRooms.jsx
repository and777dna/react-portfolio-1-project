import { useMemo } from "react";
//TODO: 2
export const useCategorizedRooms = ({ roomsData, categorises = false, relativeLocation = false }) => {
    //TODO: 1000 to filter according to "Domestic cities, International Cities, Regions, Countries"

    //categorized will be filled with categorises || relativeLocation
    const categorized = {}

    //for categorizedRooms = useCategorizedRooms(), categorises: ['City', 'Beach', 'Outdoors'] === (default)
    if (categorises) {
        categorises.forEach(category => {
            categorized[category] = roomsData.filter(room => room.category.includes(category))
        })
    }

    //for relativeLocation(not default)
    if (relativeLocation) {
        relativeLocation.forEach(location => {
            categorized[location] = roomsData?.filter(room => room.relativeLocation === location)
        })
    }



    return categorized;

    //why useMemo i shouldnt use here at all?
    /*const categorizedRooms = useMemo(() => {
        return {
            //for(i=0...) doesnt works here
            City: roomsData.filter(room => room.category.includes("City")),
            Beach: roomsData.filter(room => room.category.includes("Beach")),
            Outdoors: roomsData.filter(room => room.category.includes("Outdoors"))
        };
    }, [roomsData]);

    return categorizedRooms;*/
}