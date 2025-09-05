import axios from "axios";

const isDev = import.meta.env.DEV;

const apiClient = axios.create({
  baseURL: isDev ? import.meta.env.VITE_API_URL : "/", // Dev: json-server, Prod: static db.json
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  if (!isDev) {
    // Trong prod → ép mọi request về db.json
    config.url = "/db.json";
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use((response) => {
  if (!isDev && response.config.url === "/db.json") {
    const data = response.data;

    // Xác định endpoint gốc ban đầu
    const originalUrl = response.config.headers["x-original-url"] as string;

    if (originalUrl?.startsWith("/posts/")) {
      const id = originalUrl.split("/")[2];
      return { ...response, data: data.posts.find((p: any) => String(p.id) === id) };
    }

    if (originalUrl?.startsWith("/users/")) {
      const id = originalUrl.split("/")[2];
      return { ...response, data: data.users.find((u: any) => String(u.id) === id) };
    }

    if (originalUrl?.startsWith("/posts")) {
      return { ...response, data: data.posts };
    }

    if (originalUrl?.startsWith("/users")) {
      return { ...response, data: data.users };
    }
  }

  return response;
});

// Trick: lưu originalUrl trước khi chuyển hướng
apiClient.interceptors.request.use((config) => {
  if (!isDev) {
    config.headers["x-original-url"] = config.url || "";
    config.url = "/db.json";
  }
  return config;
});

export default apiClient;
