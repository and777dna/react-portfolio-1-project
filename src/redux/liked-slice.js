import { createSlice } from "@reduxjs/toolkit";

const likedCartSlice = createSlice({
    name: "liked",
    initialState: {
        likedServices: [],
        likedCount: 0
    },
    reducers: {
        incrementLiked: (state, action) => {
            //state.likedServices.push() = action.payload.likedID;
            const likedID = action.payload;
            //const existingLikedService = state.likedServices.find((likedService) => action.payload === likedService);

            const existingLikedService = state.likedServices.find((likedService) => action.payload === likedService.id);
            console.log("existingLikedService:", existingLikedService);
            if (existingLikedService) {
                existingLikedService.totalNumberBooked += 1;
                console.log("likedServices:", state.likedServices);
            } else {
                state.likedServices.push({
                    id: likedID,
                    totalNumberBooked: 1
                });
            }
            /*if (!state.likedServices.includes(state.likedServices.likedID)) {
                state.likedServices.push({
                    likedID,
                    likedCount: 1
                });
                //state.likedServices TODO: to make likedID:likedCount
            }
            else {
                state.likedServices.likedCount += 1;
            }*/

        },
        decrementLiked: (state, action) => {
            /*const existingLikedService = state.likedServices.find((likedService) => action.payload === likedService);
            console.log("existingLikedService:", existingLikedService);
            if (existingLikedService) {
                //state.likedServices.pop(existingLikedService)
                state.likedServices.filter((likedService) => (existingLikedService !== likedService));
                console.log("likedServices:", state.likedServices);
            }
            state.likedCount -= 1;*/

            const likedID = action.payload;
            const existingLikedService = state.likedServices.find((likedService) => action.payload === likedService.id);

            /*if (existingLikedService.totalNumberBooked === 1) {
                state.likedServices.pop()
                //state.likedServices TODO: to make likedID:likedCount
            }
            else {
                state.likedServices.totalNumberBooked -= 1;
            }*/
            console.log("action.payload:", action.payload);
            console.log("state.likedServices:", state.likedServices);
            console.log("existingLikedService:", existingLikedService);
            console.log("state.likedServices.totalNumberBooked:", state.likedServices.totalNumberBooked);
            if (existingLikedService.totalNumberBooked === 1) {
                state.likedServices.filter((service) => service.id !== action.payload);
            } else {
                existingLikedService.totalNumberBooked -= 1;
            }
            /*if (existingLikedService) {
                if (state.likedServices.totalNumberBooked === 1) {
                    state.likedServices.pop()
                } else {
                    state.likedServices.totalNumberBooked -= 1;
                }
                //state.likedServices TODO: to make likedID:likedCount
            }*/
        }
    }
})

export const { incrementLiked, decrementLiked } = likedCartSlice.actions;
export default likedCartSlice;
