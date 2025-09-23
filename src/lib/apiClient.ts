import axios from "axios";
import { normalizeError, paramsSerializer } from "@/lib/utils";
import { API_BASE_URL } from "./env";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message = normalizeError(error);
    return Promise.reject(error);
  },
);

export default apiClient;
