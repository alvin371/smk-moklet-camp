import axios from "axios";
import { handleRedirectNotLogin } from "../handleNotLogin";
import { API_URL } from "../helpers";

// Create Axios instance
export const API = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to dynamically set headers
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["makerID"] = "60"; // use your own makerID
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors like 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleRedirectNotLogin();
    }
    return Promise.reject(error);
  }
);
