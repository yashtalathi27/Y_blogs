import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem("user")) || {
    token: null,
    email: null,
    name: null,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state) {
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
