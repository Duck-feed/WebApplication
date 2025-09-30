import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";
import apiClient from "@/lib/apiClient";
import { mapNewsfeedResponse, resolveNewsfeedQuery, resolvePostPayload } from "./mapper";
import type { NewsfeedApiResponse, NewsfeedQuery, NewsfeedResponse, Post } from "./types";

export async function getPersonalNewsfeed(
  userId: string,
  params: NewsfeedQuery = {},
): Promise<NewsfeedResponse> {
  const query = resolveNewsfeedQuery(params);
  const res = await apiClient.get<NewsfeedApiResponse>(`/api/newsfeed/${userId}`, {
    params: query,
  });
  return mapNewsfeedResponse(res.data ?? {}, query);
}

export const getPosts = async (userId: string, params?: NewsfeedQuery): Promise<Post[]> => {
  const response = await getPersonalNewsfeed(userId, params);
  return response.posts;
};

export const createPost = async (data: CreatePostCommand): Promise<Post> => {
  const res = await apiClient.post("/api/posts", data);
  return resolvePostPayload(res.data);
};

export const likePost = async (postId: string): Promise<Post> => {
  const res = await apiClient.post<Post>(`/api/posts/${postId}/like`);
  return res.data;
};
