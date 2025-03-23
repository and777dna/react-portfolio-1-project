import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        bookedServices: [],
        error: null,
        loading: false,
    },
    reducers: {
        downloadMyBookingServices: (state, action) => {
            state.bookedServices = action.payload;
        },
        deleteBookingFromCart: (state, action) => {
            state.bookedServices = state.bookedServices.filter(
                (service) => service.id !== action.payload.id
            )
        },
    }
})

export const { downloadMyBookingServices, deleteBookingFromCart } = cartSlice.actions;
export default cartSlice;