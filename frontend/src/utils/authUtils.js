// src/utils/authUtils.js
import { jwtDecode } from "jwt-decode";

export const setUserLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getToken = () => {
  const user = getUserFromLocalStorage();
  return user ? user.token : null;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    return false;
  }
};
