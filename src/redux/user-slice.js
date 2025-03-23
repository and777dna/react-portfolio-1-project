import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../utils/https";
import { setError, setLoading } from "./availability-slice";

const userSlice = createSlice({
    name: "user",
    initialState: {
        //user: [],
        user: [],
        error: null,
        loading: false,
        isAdmin: false
    },
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setUserData: (state, action) => {
            //console.log("Setting user data:", action.payload);
            state.user = action.payload;
            state.loading = false;
        },
        setLoadingData: (state, action) => {
            //console.log("Setting user data:", action.payload);
            state.loading = action.payload;
        },
        clearUserData: (state, action) => {},
        updateUserData: (state, action) => {},
        showUserData: (state, action) => {},
        hideUserData: (state, action) => {},
        setErrorData: (state, action) => {
            //console.log("Setting user data:", action.payload);
            state.error = action.payload;
            state.loading = false;
        },
    },

})



export const fetchUsersData = (state, action) => {
    return async (dispatch) => {
        dispatch(setLoadingData(true));
        try {
            const usersData = await fetchData("http://localhost:3001/users");
            dispatch(setUserData(usersData))
        } catch (error) {
            dispatch(setErrorData(error.message))
        }

    }
}


export const { setUserData, clearUserData, hideUserData, showUserData, updateUserData, setErrorData, setLoadingData, setIsAdmin } = userSlice.actions;
export default userSlice;