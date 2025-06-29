/*interface FilterParams {
    filteredRoom? : object[]
}

export const useFilter: <FilterParams> = (filteredRoom) => {

}*/
export default function useFilter(roomsToFilter, filteredRoom, filterApply, antdValue) {
    //const sortType = props.uniqueProperty ? "uniqueProperty" : props.type ? "type" : "id"
    let type = filterApply ? filterApply : antdValue ? antdValue : antdValue

    switch (type) {
        case filterApply:
            filteredRoom = roomsToFilter.map(room => {//if above is markdown => roomsToFilter NO, filteredRooms YES
                if (filterApply !== []) {
                    if (filterApply.includes(room.type)) {
                        return room;
                    }
                }
            }).filter(room => room !== undefined)
            break;
        case antdValue:
            filteredRoom = roomsToFilter.map(room => {
                if (room.totalRating > antdValue) {                                                               //TODO:|
                    console.log("value is bigger")
                    return room                                                                                   //TODO:|
                }                                                                                                //TODO:|
            }).filter(room => (room !== undefined))
            break;
        default:
            console.log("default1:");
            break;
    }
}