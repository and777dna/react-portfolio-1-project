import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../utils/https";


const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        rooms: [],
        sortedRoomsAccordingToParams: [],
        currentRoomNumbersBooked: [],
        previousRoomNumbersBooked: [],
        loading: false,
        error: null,
    },
    reducers: {
        setRoomsData: (state, action) => {
            state.rooms = action.payload;
        },
        adddReservation: (state, action) => {
            const existingBookedNumber = state.currentRoomNumbersBooked.find((room) =>
                //room.id === action.payload.id
                room.id === action.payload
            )

          if (existingBookedNumber) {
              existingBookedNumber.totalNumberBooked += 1
          } else {
              //const roomToBook = state.rooms.find((room) => room.id === action.payload.id)
              const roomToBook = state.rooms.find((room) => room.id === action.payload)

              if (roomToBook) {
                  state.currentRoomNumbersBooked.push({
                      ...roomToBook,
                      totalNumberBooked: 1
                  });
              }
              //state.currentRoomNumbersBooked.push(action.payload);
          }
        },
        deleteReservationFromBookedNumbers: (state, action) => {
            state.currentRoomNumbersBooked = state.currentRoomNumbersBooked.filter(
                (reservation) => reservation.id !== action.payload.id
            )
        },
        sortAccordingToParams: (state, action) => {

        },
        /*bookRoom: (state, action) => {
            const roomIndex = state.rooms.findIndex(room => room.id === action.payload.id);
            if (roomIndex !==-1 && state.rooms[roomIndex].availability > 0) {
                state.rooms[roomIndex].availability -= 1;
            }
            console.log("Current rooms before booking:", JSON.parse(JSON.stringify(state.rooms)));
        },
        cancelBooking: (state, action) => {
            const roomIndex = state.rooms.findIndex(room => room.id === action.payload.id);
            if (roomIndex !==-1) {
                state.rooms[roomIndex].availability += 1;
            }
            console.log("Current rooms before booking:", JSON.parse(JSON.stringify(state.rooms)));
        },*/
        showHistory: (state, action) => {},
        moveToHistory: (state, action) => {},
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {

        },

    }
})

export const fetchBookings = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const bookingData = await fetchData("http://localhost:3001/services");
            dispatch(setRoomsData(bookingData))
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error.message))
        }
    }
}



// Универсальная функция для бронирования и отмены бронирования
export const updateRoomAvailability = (bookingID, actionType) => {
    return async (dispatch) => {
        console.log(`1. I am inside ${actionType}Room`);
        try {
            const response = await fetch("http://localhost:3001/services/update-available-room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookingID, action: actionType }),  // Передаем bookingID и действие
            });

            if (!response.ok) {
                throw new Error("Could not update available room");
            }

            dispatch(fetchBookings())
            /*//actionType === "addBooking" ? dispatch(bookRoom(bookingID, actionType)) : dispatch(cancelBooking(bookingID, actionType));
            actionType === "addBooking"
                ? dispatch(bookRoom({ id: bookingID }))
                : dispatch(cancelBooking({ id: bookingID }));*/
            /*const data = await response.json();
            return data;*/


        } catch (error) {
            dispatch(setError(error.message));  // Обработка ошибок
        }
    };
};



export const { showHistory, moveToHistory, setLoading, setError, setRoomsData, adddReservation, deleteReservationFromBookedNumbers, sortAccordingToParams} = bookingSlice.actions;
export default bookingSlice;