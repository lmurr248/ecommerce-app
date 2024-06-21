import { configureStore } from "@reduxjs/toolkit"; // Correct import
import { thunk } from "redux-thunk";
import { productListReducer } from "./reducers/productReducers";

const initialState = {};
const reducer = {
  productList: productListReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
