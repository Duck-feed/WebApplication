import apiClient from "@/lib/apiClient";
import type { User } from "./types";

export const authApi = {
    async getUserById(id: number) : Promise<User> {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    }
}