// /src/redux/actions/recommendationActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const searchAndFetchRecommendations = createAsyncThunk(
  "recommendations/searchAndFetch",
  async ({ query }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.BASE_URL}/aggregator/searchAndRecommend`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.recommendations;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
