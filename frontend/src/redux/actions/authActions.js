// src/redux/actions/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/api/authService";
import {
  setUserLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  isTokenExpired,
} from "../../utils/authUtils";

// Add an action for checking user authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, thunkAPI) => {
    const user = getUserFromLocalStorage();
    if (!user || isTokenExpired(user.token)) {
      console.log("User is not authenticated or token is expired");
      removeUserFromLocalStorage(); // Ensure user is logged out if token is expired
      return thunkAPI.rejectWithValue("User is not authenticated or token is expired");
    }
    console.log("User is authenticated and token is valid");
    return user;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      console.log("Register response:", response);
      setUserLocalStorage(response.data); // This function should handle null/undefined data internally
      return response.data;
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);
      // Check if the error message is 'User already exists'
      if (error.response?.data?.message === "User already exists") {
        // You can customize this message to fit your application's needs
        return thunkAPI.rejectWithValue(
          "User already exists. Please try logging in or using a different email."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      console.log("Login response:", response);
      setUserLocalStorage(response.data); // This function should handle null/undefined data internally
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "An unexpected error occurred"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await authService.logout();
    console.log("Logout response:", response);
    removeUserFromLocalStorage(); // Clears the user from localStorage
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(
      error.response?.data || "Failed to log out"
    );
  }
});
