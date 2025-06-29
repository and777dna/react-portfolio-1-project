import { useRoomsData } from "./useRoomsData";

export default function useSort({ location = false, type = false, City = false, country = false }) {
    const { roomsData } = useRoomsData()

    //TODO:8890
    console.log("roomsData:", roomsData)
    console.log("hello")

    let sortByCity = [];
    /*const sortByCityy = useMemo(() => {
        roomsData.forEach((city) => {
            (city?.cityId === "city003") ? sortByCity.push(city) : console.log("they are not equal")
            if (city?.cityID === "city003") {
            sortByCity.push(city);
            console.log("the statement is true")
        }
        })
        return sortByCity
    }, []);*/
    roomsData.forEach((city) => {
        //(city?.cityId === "city003") ? sortByCity.push(city) : console.log("they are not equal")
        (city?.cityId === City) ? sortByCity.push(city) : console.log("they are not equal")
        //sortByCity.filter((deleteNotUnique) => deleteNotUnique)
    })

    const sortByCityCount = roomsData.length;
    //console.log("sortByCity:", sortByCity);

    let sortedByType = []
    if (type) {
        sortByCity.forEach((city) => {
            (city?.type === type) ? sortedByType.push(city) : console.log("they are not equal")
        })
        return { sortByCity, sortByCityCount, sortedByType }
    }

    let sortedByLocation = []
    if (location) {
        sortByCity.forEach((city) => {
            (city?.location === location) ? sortedByLocation.push(city) : console.log("they are not equal")
        })
        return { sortByCity, sortByCityCount, sortedByLocation }
    }

    return { sortByCity, sortByCityCount }
    //return roomsData;
    //const size//parameter to return
}