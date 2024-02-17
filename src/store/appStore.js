import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";

export const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        login: loginReducer,
        user: userReducer,
    }
});