// /src/redux/actions/signUpActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setSignUpData } from "../reducers/signUpReducer";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./authActions";
import config from "../../config";

export const updateSignUpData = (data) => (dispatch) => {
  dispatch(setSignUpData(data));
};

// Refactor completeSignUp to use createAsyncThunk
export const completeSignUp = createAsyncThunk(
  "users/completeSignUp",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("Attempting to register with data:", data);
      const response = await axios.post(
        `${config.BASE_URL}/users/register`,
        data
      );
      if (response.status !== 200) {
        throw new Error("Registration failed with status: " + response.status);
      }
      console.log("Registration successful with response:", response.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(data));
      return response.data;
    } catch (error) {
      let errorMessage = "Registration failed due to an unexpected error.";
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status) {
          errorMessage = `Registration failed with status: ${error.response.status}`;
        }
      }
      console.error("Registration error:", errorMessage);
      dispatch({
        type: REGISTER_FAIL,
        payload: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);