import { createSlice } from '@reduxjs/toolkit';

const initialState ={"name":null,"email":null,"imageUrl":null,"googleId":null};

const googleSlice = createSlice({
    name: "googleSlice",
    initialState,
    reducers: {
        gdata(state, action) {
            name:action.payload.name;
            email:action.payload.email;
            imageUrl:action.payload.imageUrl;
            googleId:action.payload.googleId;

            return state;
        },
    },
});

export const { gdata } = googleSlice.actions;
export default googleSlice.reducer;
