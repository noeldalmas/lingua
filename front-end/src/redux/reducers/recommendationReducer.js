// /src/redux/reducers/recommendationReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { searchAndFetchRecommendations } from "../actions/recommendationActions";

const initialState = {
  recommendations: [],
  loading: false,
  error: null,
};

const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAndFetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAndFetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(searchAndFetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recommendationSlice.reducer;
