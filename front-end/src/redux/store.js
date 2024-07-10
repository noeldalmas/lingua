// /src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Named import
import signUpReducer from "./reducers/signUpReducer";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
