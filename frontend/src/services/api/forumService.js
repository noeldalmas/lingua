// src/services/api/forumService.js
import axios from "axios";
import authHeader from "../../utils/authHeader";

const API_URL = "/api/forums/";

const getForums = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getForumById = (forumId) => {
  return axios.get(API_URL + forumId, { headers: authHeader() });
};

const createForumPost = (forumData) => {
  return axios.post(API_URL, forumData, { headers: authHeader() });
};

const updateForumPost = (forumId, forumData) => {
  return axios.patch(API_URL + forumId, forumData, { headers: authHeader() });
};

const deleteForumPost = (forumId) => {
  return axios.delete(API_URL + forumId, { headers: authHeader() });
};

const forumService = {
  getForums,
  getForumById,
  createForumPost,
  updateForumPost,
  deleteForumPost,
};

export default forumService;
