import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: { value: false },
    reducers: {
        loginUser: (state, action) => {
            state.value = true;
        },
        logoutUser: (state, action) => {
            state.value = false;
        }
    }
});

export const { loginUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;