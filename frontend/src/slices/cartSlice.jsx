import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/CartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((cartItem) => cartItem._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) => (cartItem._id === existItem._id ? item : cartItem));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((product) => product._id !== item._id);
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
