import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchBlogCategoryThunk = createAsyncThunk(
  'fetchblogcategory/FetchBlogCategoryThunk',
  async (category, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getblogcategory?category=${category}`
      );
      if (response.status === 200) {
        return response.data.data
      }
    } catch (error) {
      console.error("Thunk error:", error);
      return rejectWithValue(error.response?.data?.message || "Error fetching images");
    }
  }
);