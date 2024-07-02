// src/utils/apiUtils.js
import axios from "axios";
import authHeader from "./authHeader";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000",
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...authHeader(),
    };
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // handle 401 errors globally
      // e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export default instance;
