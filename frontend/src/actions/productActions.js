import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching product list
export const listProducts = createAsyncThunk(
  "productList/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk for fetching product details
export const detailsProduct = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
