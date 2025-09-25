import apiClient from "@/lib/apiClient";
import type { Post } from "./types";
import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";

export const getPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get("/api/posts");
  return res.data;
};

export const createPost = async (data: CreatePostCommand): Promise<Post> => {
  const res = await apiClient.post("/api/posts", data);
  return res.data;
};

export const likePost = async (postId: string): Promise<Post> => {
  const res = await apiClient.post(`/api/posts/${postId}/like`);
  return res.data;
};
