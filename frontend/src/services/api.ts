import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor (optional - for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

// API methods
export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get("/healthz");
    return response.data;
  },

  // Get API data
  getApiData: async () => {
    const response = await api.get("/api-data");
    return response.data;
  },

  // Example POST request
  createItem: async (data: any) => {
    const response = await api.post("/api/items", data);
    return response.data;
  },
};

export default api;
