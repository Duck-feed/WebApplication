import apiClient from "@/lib/apiClient";
import type { Post } from "./types";

export const getPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get("/posts");
  return res.data;
};

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  const res = await apiClient.post("/posts", data);
  return res.data;
};

export const likePost = async (postId: string): Promise<Post> => {
  const res = await apiClient.post(`/posts/${postId}/like`);
  return res.data;
};
