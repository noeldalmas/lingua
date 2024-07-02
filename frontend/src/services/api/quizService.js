// src/services/api/quizService.js
import axios from "axios";
import authHeader from "../../utils/authHeader";

const API_URL = "/api/quizzes/";

const getQuizzes = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getQuizById = (quizId) => {
  return axios.get(API_URL + quizId, { headers: authHeader() });
};

const createQuiz = (quizData) => {
  return axios.post(API_URL, quizData, { headers: authHeader() });
};

const updateQuiz = (quizId, quizData) => {
  return axios.patch(API_URL + quizId, quizData, { headers: authHeader() });
};

const deleteQuiz = (quizId) => {
  return axios.delete(API_URL + quizId, { headers: authHeader() });
};

const quizService = {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};

export default quizService;
