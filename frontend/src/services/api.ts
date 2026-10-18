import axios from "axios";

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL || "http://localhost:3000"
  : "";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
