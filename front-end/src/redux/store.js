// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./reducers/signUpReducer";
import authReducer from "./reducers/authReducer";
import recommendationReducer from "./reducers/recommendationReducer";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    recommendations: recommendationReducer,
  },
});

export default store;
