import { createSlice } from '@reduxjs/toolkit';

const initialState = { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        // If item already exists in cart, update its quantity
        state.cartItems = state.cartItems.map(x =>
          x.product === existItem.product ? { ...x, qty: item.qty } : x 
        );
      } else {
        // If item doesn't exist in cart, add it
        state.cartItems.push(item);
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
    }
  }
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
