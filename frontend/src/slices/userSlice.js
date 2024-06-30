import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axiosConfig";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from "../constants/userConstants";

// Register user async action
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Signin user async action (if not already defined)
export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Additional reducers can go here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(USER_REGISTER_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(USER_REGISTER_SUCCESS, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(USER_REGISTER_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_SIGNIN_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(USER_SIGNIN_SUCCESS, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(USER_SIGNIN_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
