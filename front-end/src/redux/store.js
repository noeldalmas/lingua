// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./reducers/signUpReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
  },
});

export default store;
