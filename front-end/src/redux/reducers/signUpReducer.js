// /src/redux/reducers/signUpReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "",
  level: "",
  name: "",
  email: "",
  username: "",
  password: "",
  nativeLanguage: "",
  dailyGoal: "",
  topics: [],
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSignUpData: () => initialState,
  },
});

export const { setSignUpData, resetSignUpData } = signUpSlice.actions;
export default signUpSlice.reducer;
