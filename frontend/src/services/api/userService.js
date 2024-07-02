// src/services/api/userService.js
import axios from "axios";
import authHeader from "../../utils/authHeader";

const API_URL = "/api/users/";

const getUsers = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getUserById = (userId) => {
  return axios.get(`${API_URL}${userId}`, { headers: authHeader() });
};

const updateUser = (userId, userData) => {
  return axios.patch(`${API_URL}${userId}`, userData, {
    headers: authHeader(),
  });
};

const deleteUser = (userId) => {
  return axios.delete(`${API_URL}${userId}`, { headers: authHeader() });
};

const userService = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;
