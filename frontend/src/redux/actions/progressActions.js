// src/redux/actions/progressActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import progressService from "../../services/api/progressService";

export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async (_, thunkAPI) => {
    try {
      const response = await progressService.getProgress();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async (progressData, thunkAPI) => {
    try {
      const response = await progressService.updateProgress(progressData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
