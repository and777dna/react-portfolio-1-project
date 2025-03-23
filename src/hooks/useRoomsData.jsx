import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adddReservation, fetchBookings, updateRoomAvailability } from "../redux/booking-slice";

export const useRoomsData = () => {
    const dispatch = useDispatch();

    const roomsData = useSelector((state) => state.booking.rooms) || [];
    const reservedRooms = useSelector((state) => state.booking.currentRoomNumbersBooked) || [];


    useEffect(() => {
        dispatch(fetchBookings())
    }, [dispatch]);//I think I should get rid of dependencies here, and then to fetch data only 2(in the beginning and in the end).


    function addReservation(reservationID, book) {
        dispatch(updateRoomAvailability(reservationID, book))
        dispatch(adddReservation(reservationID));
    }
    useEffect(() => {
        console.log("reservedRooms updated:", reservedRooms);
    }, [reservedRooms]); // Будет выполняться каждый раз при изменении reservedRooms


    function deleteReservation(reservationID, book) {
        dispatch(updateRoomAvailability(reservationID, book))
    }

    console.log("Rooms data:", roomsData);



    useEffect(() => {
        console.log("Rooms data from Redux:", roomsData);
    }, [roomsData]); // Логируем при изменении данных

    return {
        addReservation: addReservation,
        deleteReservation: deleteReservation,
        roomsData: roomsData,
    }
}