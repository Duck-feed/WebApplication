import apiClient from "@/lib/apiClient";
import type { LoginResponse } from "./types";

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await apiClient.post("/users/auth/login", { email, password });
    return res.data.data;
  },
  async logout(): Promise<void> {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) return;
    await apiClient.post("/users/auth/logout", undefined, { headers: { Authorization: token } });
  }
};