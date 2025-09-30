import apiClient from "@/lib/apiClient";
import type { ApiSuccessResponse } from "@/lib/types";
import type { LoginResponse } from "./types";
import type { User } from "./types";

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await apiClient.post("/api/users/auth/login", { email, password });
    return res.data.data;
  },
  async logout(): Promise<void> {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) return;
    await apiClient.post("/api/users/auth/logout", undefined, {
      headers: { Authorization: token },
    });
  },
  async getMe(): Promise<User> {
    const res = await apiClient.get<ApiSuccessResponse<User>>("/api/users/profile/me");
    return res.data.data;
  },
};
