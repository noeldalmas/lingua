// src/services/api/lessonService.js
import axios from "axios";
import authHeader from "../../utils/authHeader";

const API_URL = "/api/lessons/";

const getLessons = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getLessonById = (lessonId) => {
  return axios.get(API_URL + lessonId, { headers: authHeader() });
};

const createLesson = (lessonData) => {
  return axios.post(API_URL, lessonData, { headers: authHeader() });
};

const updateLesson = (lessonId, lessonData) => {
  return axios.patch(API_URL + lessonId, lessonData, { headers: authHeader() });
};

const deleteLesson = (lessonId) => {
  return axios.delete(API_URL + lessonId, { headers: authHeader() });
};

const lessonService = {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};

export default lessonService;
