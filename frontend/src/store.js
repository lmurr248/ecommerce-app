import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";

const initialState = {};

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
