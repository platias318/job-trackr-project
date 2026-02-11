import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);
export const apiService = {
  healthCheck: async () => {
    const response = await api.get("/healthz");
    return response.data;
  },

  getApiData: async () => {
    const response = await api.get("/api-data");
    return response.data;
  },

  createItem: async (data: any) => {
    const response = await api.post("/api/items", data);
    return response.data;
  },
};

export default api;
