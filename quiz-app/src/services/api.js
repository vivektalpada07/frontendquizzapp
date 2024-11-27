import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api", // Use environment variable or fallback to localhost
});

// Add interceptors for requests (no Authorization header)
API.interceptors.request.use(
  (req) => {
    return req; // Do not attach any Authorization header
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add interceptors for responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error response:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
