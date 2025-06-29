import { createSlice } from "@reduxjs/toolkit";

const availabilitySlice = createSlice({
    name: "availability",
    initialState: {
        rooms: [],
        sortedRooms: [],
        sortedRoomsByTypeAndCountry: [],
        sortedType: [],
        payments: [],
        changed: false,
        notification: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSortedRooms: (state, action) => {
            state.sortedRooms = action.payload;
        },
        setSortedByPropertyTypeAndCountry: (state, action) => {
            console.log("action.payload.country, action.payload.type:",action.payload.country, action.payload.type)
            console.log("0.state.sortedRooms:", state.sortedRooms)
            //state.sortedRoomsByTypeAndCountry = state.sortedRooms
            const filteredRooms = state.sortedRooms
                .filter(room => room.country === action.payload.country)
                .filter(room => room.type === action.payload.type)
                //.filter(room => room.type === "Hotels")
            state.sortedRoomsByTypeAndCountry = filteredRooms;
            console.log("1.state.sortedRooms filteredRooms:", filteredRooms)
            console.log("1.state.sortedRooms:", state.sortedRoomsByTypeAndCountry)
        },
        setSortedType: (state, action) => {
            console.log("action.payload:",action.payload)
            state.sortedType = action.payload;
        },
        setAvailability: (state, action) => {
            state.availability = action.payload;
        },
        updateAvailability: (state, action) => {
            const updatedAvailability = state.rooms.availability.map(
                item => item.id === action.payload.id ? { ...item, availability: action.payload.status } : item
            )
            state.rooms.availability = updatedAvailability;
        },
        clearAvailability: (state) => {
            state.rooms.availability = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})


export const fetchBookingData = (bookings) => {
    return async (dispatch) => {
        console.log("I am inside fetchBookingData");

        const fetchData = async () => {
            fetch("http://localhost:3001/bookings")
        }

        try {
            const bookingsData = await fetchData();
            const parsedJSON = await bookingsData.json();
            return parsedJSON;
        } catch (e) {
            console.log("error get catched:", e)
        }



        console.log("Finished fetchBookingData");
    }
}


export const { setAvailability, updateAvailability, clearAvailability, setError, setLoading, setSortedRooms, setSortedByPropertyTypeAndCountry, setSortedType } = availabilitySlice.actions;
export default availabilitySlice;