// src/api/authService.js
import axiosInstance from "./axiosInstance";

export const signup = async (userData) => {
  return await axiosInstance.post("/users/register", userData);
};

export const login = async (userData) => {
  return await axiosInstance.post("/users/login", userData);
};
