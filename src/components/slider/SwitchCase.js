import { useDispatch, useSelector } from "react-redux";
import { setSortedRooms } from "../../redux/availability-slice";
import { useEffect, useMemo } from "react";

export default function SwitchCase(type, rooms, country = false, city = false) {
    //console.log("I am inside export default function SwitchCase")
    let lastArray = [];
    let lastlastArray = []
    let sortedCitiesForCountryUnique = [];
    let seenCityForCountry = new Set()
    let sortedCitiesUnique = [];
    let seenCities = new Set();
    let sortedTypeUnique = [];
    let seenTypeUnique = new Set()
    let seenType = new Set()



    //console.log("type:", type)
    //console.log("type:", type === "uniqueProperty")



    //console.log("rooms.length: ", rooms.length)

    const toMakeUnique = (rooms) => {
        let counter = 0;//TODO: to check if this needed at all
        //let sortedRoomsUnique = [];
        let seenIds = new Set()
        const uniqueRooms = [];

        rooms.forEach((room) => {
            if(!seenIds.has(room.id)) {//to sort by "id"
                seenIds.add(room.id);
                //sortedRoomsUnique.push(room);
                uniqueRooms.push(room);
                counter++;
            }
        })

        return uniqueRooms;
    }

    const sortedRoomsUnique = useMemo(() => {
        const unique = toMakeUnique(rooms);
       return unique;
    }, [rooms]);
    //console.log("sortedRoomsUnique:", sortedRoomsUnique)
    /*let sortedRoomsUnique = [];
    const toMakeUnique = (rooms) => {
        let counter = 0;//TODO: to check if this needed at all
        //let sortedRoomsUnique = [];
        let seenIds = new Set()
        const uniqueRooms = [];

        rooms.forEach((room) => {
            if(!seenIds.has(room.id)) {//to sort by "id"
                seenIds.add(room.id);
                //sortedRoomsUnique.push(room);
                uniqueRooms.push(room);
                counter++;
            }
        })

        return uniqueRooms;
    }
    sortedRoomsUnique = toMakeUnique(rooms);
    console.log("sortedRoomsUnique:", sortedRoomsUnique)*/

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSortedRooms(sortedRoomsUnique));
    }, []);//to change dependencies, because of thwm i got shit

    const sortedRoomsRedux = useSelector(
        (state) => state.availability.sortedRooms
    );

    useEffect(() => {
        console.log('Из Redux:', sortedRoomsRedux);
    }, [sortedRoomsRedux]);


    let sortedRoomsU = [];
    switch(type) {
        case "sales":
            const today = new Date("2025-01-01T00:00:00Z");//1 of them is not shown

            const filteredBySales = sortedRoomsUnique.filter((room) => {
                if (!room.sales) return false;

                return room.sales.some((saleObj) => {//i dont understand why is here some() method
                    const key = Object.keys(saleObj)[0];
                    const sale = saleObj[key];

                    const start = new Date(sale.startDate);
                    const end = new Date(sale.endDate);

                    return today >= start && today <= end;
                });
            });

            //const seenType = new Set();
            //const sortedRoomsU: typeof sortedRoomsUnique = [];

            filteredBySales.forEach((room) => {
                if (!seenType.has(room.type)) {
                    seenType.add(room.type);
                    sortedRoomsU.push(room);
                }
            });

            console.log("filtered rooms by active sales:", sortedRoomsU);
            return sortedRoomsU;
        /*case "type":
            sortedRoomsUnique.forEach((room, index) => {
                if (!seenType.has(room.type)) {//TODO: to see difference between .has() || .includes()
                    seenType.add(room.type);
                    sortedRoomsU.push(room);
                }
            })
            console.log("sortedRoomsUnique for type:", sortedRoomsUnique)
            return sortedRoomsU;*/
        /*case "uniqueProperty":
            sortedRoomsUnique.forEach((room, index) => {
                if (!seenTypeUnique.has(room) && (room.uniqueProperty === true) ) {//TODO: to see difference between .has() || .includes()
                    seenTypeUnique.add(room);
                    sortedTypeUnique.push(room);
                }
            })
            return sortedTypeUnique;*/
        case "country":
            sortedRoomsUnique.forEach((room, index) => {
                if (!seenCities.has(room.cityId) && (country === room.country)) {
                    seenCities.add(room.cityId);
                    sortedRoomsU.push(room);
                    sortedCitiesUnique.push(room.cityId);
                }
            })
            console.log("sortedRoomsU country:", sortedRoomsU);

            return sortedRoomsU;
        /*case type === "country" && city:
            // code block
            console.log("90808")
            rooms.forEach((room, index) => {
                if (!seenCityForCountry.has(room.cityId)) {
                    seenCityForCountry.add(room.cityId);
                    sortedCitiesForCountryUnique.push(room.cityId)
                }
            })
            console.log("type: country:", rooms)
            console.log("1. sortedRoomsUnique country:", sortedRoomsUnique)
            console.log("sortedCitiesUnique country:", sortedCitiesUnique)
            break;
        case type === "rating":
            // code block
            lastArray = [...rooms].sort((a, b) => b.totalRating - a.totalRating);
            sortedRoomsUnique = lastArray
            console.log("lastArray11:", lastArray);
            break;//i think it works, but not shown due to a too big number of console.logs()
        case type === "sales":
            // code block
            console.log("rooms.sales:", rooms);
            const sales = rooms.map((room) => room.sales)
            console.log("sales:", sales);

            console.log("roomsroomsroomsrooms:", rooms);
            //const januarySales = rooms.flatMap(room =>
            const januarySales = rooms.map(room =>
                (room.sales || []).filter(saleObj => {
                    const sale = Object.values(saleObj)[0];
                    return sale.startDate.startsWith("2025-01");
                })
            );
            const januarySalesWithoutBlankLines = januarySales.filter(saleObj => {//TODO: how to filter this
                if (saleObj !== []){
                    return saleObj
                } else {
                    saleObj.pop()
                }
            })
            console.log("januarySalesWithoutBlankLines:", januarySalesWithoutBlankLines);
            break;*/
        default:
            //console.log("default1:");
        // code block
    }
}