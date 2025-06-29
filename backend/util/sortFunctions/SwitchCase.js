let sortedRoomsU = [];
let sortedRoomsSales = [];
let sortedRoomsCountry = [];
let sortedCitiesUnique = [];
let seenCities = new Set();
let sortedTypeUnique = [];
let seenTypeUnique = new Set()
let seenType = new Set()


const SwitchCase = ({ sortedRoomsUnique, type }) => {
    console.log("type:", type)
    switch(type) {
        case "sales":
            const today = new Date("2025-01-01T00:00:00Z");//1 of them is not shown

            const filteredBySales = sortedRoomsUnique.filter((room) => {
                if (!room.sales) return false;//why should it return false



                return room.sales.some((saleObj) => {//i dont understand why is here some() method
                    const key = Object.keys(saleObj)[0];
                    const sale = saleObj[key];
                    //console.log("key, sale:",key, sale);
                    console.log("sale:",sale);

                    const start = new Date(sale.startDate);
                    const end = new Date(sale.endDate);

                    //console.log("HEREHEREHEREHRERHEHR");

                    return today >= start && today <= end;
                });
            });

            //const seenType = new Set();
            //const sortedRoomsU: typeof sortedRoomsUnique = [];

            //console.log("filteredBySales:", filteredBySales)

            /*filteredBySales.forEach((room) => {//i dont know if i should use it
                if (!seenType.has(room.type)) {
                    seenType.add(room.type);
                    sortedRoomsSales.push(room);
                }
            });*/

            //console.log("filtered rooms by active sales:", sortedRoomsU);
            return filteredBySales;
            //return sortedRoomsSales;
        case "type":
            sortedRoomsUnique.forEach((room, index) => {
                if (!seenType.has(room.type)) {//TODO: to see difference between .has() || .includes()
                    seenType.add(room.type);
                    sortedRoomsU.push(room);
                }
            })
            //console.log("sortedRoomsUnique for type:", sortedRoomsUnique)
            return sortedRoomsU;
        case "uniqueProperty":
            sortedRoomsUnique.forEach((room, index) => {
                if (!seenTypeUnique.has(room) && (room.uniqueProperty === true) ) {//TODO: to see difference between .has() || .includes()
                    seenTypeUnique.add(room);
                    sortedTypeUnique.push(room);
                }
            })
            return sortedTypeUnique;
        /*case "country":
            sortedRoomsUnique.forEach((room, index) => {
                if (!seenCities.has(room.cityId) && (country === room.country)) {
                    seenCities.add(room.cityId);
                    sortedRoomsU.push(room);
                    sortedCitiesUnique.push(room.cityId);
                }
            })
            console.log("sortedRoomsU country:", sortedRoomsU);

            return sortedRoomsU;*/
        case "CZ":
            sortedRoomsUnique.forEach((room, index) => {
                //console.log("type, room.country:", type, room.country);
                if (!seenCities.has(room.cityId) && (type === room.country)) {
                    console.log("type, room.country:", type, room.country);
                    seenCities.add(room.cityId);
                    sortedRoomsCountry.push(room.cityId);
                    sortedCitiesUnique.push(room.cityId);
                }
            })
            //console.log("sortedRoomsU country:", sortedRoomsU);

            return sortedRoomsCountry;
        default:
            console.log("default");
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
    }

}

export default SwitchCase;