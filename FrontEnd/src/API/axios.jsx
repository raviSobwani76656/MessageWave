import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🚀 Making request to:", config.url);
    console.log("🍪 With credentials:", config.withCredentials);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error.response?.status, error.message);
    console.error("📍 Failed URL:", error.config?.url);
    return Promise.reject(error);
  }
);