// src/services/api/courseService.js
import axios from "axios";
import authHeader from "../../utils/authHeader";

const API_URL = "/api/courses/";

const getCourses = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getCourseById = (courseId) => {
  return axios.get(API_URL + courseId, { headers: authHeader() });
};

const createCourse = (courseData) => {
  return axios.post(API_URL, courseData, { headers: authHeader() });
};

const updateCourse = (courseId, courseData) => {
  return axios.patch(API_URL + courseId, courseData, { headers: authHeader() });
};

const deleteCourse = (courseId) => {
  return axios.delete(API_URL + courseId, { headers: authHeader() });
};

const courseService = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default courseService;
