import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchBlogThunk = createAsyncThunk(
  'fetchblog/FetchBlogThunk',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getblog`
      );
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error("Thunk error:", error);
      return rejectWithValue(error.response?.data?.message || "Error fetching images");
    }
  }
);