// src/services/api/progressService.js
import axios from "axios";
import authHeader from "../../utils/authHeader";

const API_URL = "/api/progress/";

const getProgress = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getProgressById = (progressId) => {
  return axios.get(API_URL + progressId, { headers: authHeader() });
};

const updateProgress = (progressId, progressData) => {
  return axios.patch(API_URL + progressId, progressData, {
    headers: authHeader(),
  });
};

const progressService = {
  getProgress,
  getProgressById,
  updateProgress,
};

export default progressService;
