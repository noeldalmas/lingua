// src/services/api/authService.js
import instance from "../../utils/apiUtils";

const API_URL = "/api/users/";

const register = (userData) => {
  return instance.post(`${API_URL}register`, userData);
};

const login = (credentials) => {
  return instance.post(`${API_URL}login`, credentials);
};

const logout = () => {
  localStorage.removeItem("user");
  return Promise.resolve();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
