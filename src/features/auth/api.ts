import apiClient from "@/lib/apiClient";
import type { LoginResponse } from "./types";

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await apiClient.post("/users/auth/login", { email, password });
    return res.data.data;
  }
};
