import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Correct import of thunk
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducers"; // Correct import of cartReducer
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";

// Load cart items from localStorage if available
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
