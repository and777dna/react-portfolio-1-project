import { configureStore } from "@reduxjs/toolkit";
import availabilitySlice from "./availability-slice";
import userSlice from "./user-slice";
import bookingSlice from "./booking-slice";
import cartSlice from "./cart-slice";
import likedCartSlice from "./liked-slice";

const store = configureStore({
    reducer: {
        availability: availabilitySlice.reducer,
        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        cart: cartSlice.reducer,
        liked: likedCartSlice.reducer,
    }
})

export default store;