const toMakeUnique = (services) => {
    let counter = 0;//TODO: to check if this needed at all
    //let sortedRoomsUnique = [];
    let seenIds = new Set()
    const uniqueRooms = [];

    services.forEach((room) => {
        if(!seenIds.has(room.id)) {//to sort by "id"
            seenIds.add(room.id);
            //sortedRoomsUnique.push(room);
            uniqueRooms.push(room);
            counter++;
        }
    })

    return uniqueRooms;
}

export default toMakeUnique;