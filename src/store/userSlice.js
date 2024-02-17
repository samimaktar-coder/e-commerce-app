import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: { data: null },
    reducers: {
        addUser: (state, action) => {
            state.data = action.payload;
        },
    }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;