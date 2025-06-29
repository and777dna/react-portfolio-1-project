import { useCallback, useEffect, useRef } from "react";
/********************************************************************/
/*  File:     Avatar.tsx                                            */
/*  Project:  PET project - Web application for bookings            */
/*  Author:   Sartin Andrei (xfolty17), FIT BUT                     */
/*  Contact:  xfolty17@stud.fit.vutbr.cz                            */
/********************************************************************/


const useUpdateFilteredRoom = ({ roomsToFilter, filteredRoom, setFilteredRoom, antdValue, setAntdValue, filterApply, setFilterApply, filteredRoom1, setFilteredRoom1 }) => {
    /*const filteredRef = useRef([]);

    //2 filters are applied here: totalRating, room.type
    useEffect(() => {
        const newFiltered = roomsToFilter.filter(room => {//this imutate the old value, but i need to return old values to filter
            if (room.totalRating > antdValue) {                                                               //TODO:|
                console.log("value is bigger")
                return room//return {}                                                                                   //TODO:|
            }
        })

        filteredRef.current = newFiltered;
        const newFiltered1 = filteredRef.current.filter( room => filterApply.includes(room.type) )

        //setFilteredRoom1(newFiltered1)
        setFilteredRoom(newFiltered1)

        console.log("filteredRoom, filteredRoom1:", filteredRoom, filteredRoom1)

    //}, [roomsToFilter, filteredRoom]);
    }, [roomsToFilter, antdValue, filterApply]);//if i have "filteredRoom" dependency, then it is unending
    //TODO: to add some others dependencies here*/

    useEffect(() => {
        const newFiltered = roomsToFilter
            .filter(room => room.totalRating > antdValue)
            .filter(room => filterApply.includes(room.type))
        setFilteredRoom(newFiltered)

        console.log("filteredRoom:", filteredRoom)
    }, [roomsToFilter, antdValue, filterApply]);


    const onChange = useCallback((e) => {
        const value = Number(e.target.value);
        setAntdValue(value); // и useEffect сам пересчитает по новому рейтингу
        //}, [roomsToFilter]);
    }, [setAntdValue]);

    return { onChange };


    /*onChange = e => {
        setAntdValue(e.target.value);
        console.log("e.target.value",e.target.value)
        //const filteredRoom = roomsToFilter.map(room => {                                            //TODO:|
        const newFiltered = roomsToFilter.map(room => {
            if (room.totalRating > antdValue) {                                                               //TODO:|
                console.log("value is bigger")
                return room                                                                                   //TODO:|
            }                                                                                                //TODO:|
        }).filter(room => (room !== undefined))
        setFilteredRoom(newFiltered)//TODO: ----------------------------------------------------------------------------------------------------------------

        console.log("roomsToFilter:",roomsToFilter)
        console.log("antdValue:",antdValue)
        console.log("filteredRoom:",filteredRoom)
        console.log("filteredRoom?.length:",filteredRoom?.length)

    };*/                                                                                                          //TODO:/\


    /*const onChange = useCallback((e) => {
        const value = Number(e.target.value);
        setAntdValue(value); // и useEffect сам пересчитает по новому рейтингу
        /!*const value = e.target.value;//Number() is not requiered here
        setAntdValue(value);

        const newFiltered = roomsToFilter.filter(room => room.totalRating > value);
        setFilteredRoom(newFiltered);*!/
    //}, [roomsToFilter]);
    }, []);

    return { onChange };*/


}

export default useUpdateFilteredRoom;