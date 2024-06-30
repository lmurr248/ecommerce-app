// store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./slices/productSlice";
import cartReducer from "./slices/cartSlice"; // Assuming this is correctly configured
import userReducer from "./slices/userSlice"; // Import userSlice instead of userReducers

// Load cart items from localStorage if available
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  userSignin: {
    userInfo: null, // or {}
    loading: false,
    error: null,
  },
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer, // Use userSlice reducer
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
