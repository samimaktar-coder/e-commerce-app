import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 10,
    orderTotal: 0,
    totalPrice: 0
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem: (state, action) => {
            let { product, quantity = 1 } = action.payload;
            let itemIndex = state.cartItems.findIndex(item => item.id === product.id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity += Number(quantity);
            } else {
                state.cartItems.push({ ...product, quantity: Number(quantity) });
            }

            state.numItemsInCart = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.cartTotal = state.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
            state.totalPrice = state.cartTotal + state.shipping;
        },
        editItem: (state, action) => {
            let { id, quantity } = action.payload;
            let itemIndex = state.cartItems.findIndex(item => item.id === id);
            state.cartItems[itemIndex].quantity = Number(quantity);
            state.numItemsInCart = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.cartTotal = state.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
            state.totalPrice = state.cartTotal + state.shipping;
        },
        removeItem: (state, action) => {
            let itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);
            state.cartTotal = state.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
            state.numItemsInCart = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = state.cartTotal + state.shipping;
        },
        clearCart: (state, action) => {
            state.cartItems = [];
            state.numItemsInCart = 0;
            state.cartTotal = 0;
            state.shipping = 10;
            state.orderTotal = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addItem, editItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;