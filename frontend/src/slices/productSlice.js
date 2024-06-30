import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// Initial states
const initialProductListState = { products: [] };
const initialProductDetailsState = { product: {}, loading: true };

// Product List Slice
const productListSlice = createSlice({
  name: "productList",
  initialState: initialProductListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Product Details Slice
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialProductDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detailsProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailsProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(detailsProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Thunks and Reducers
export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
