import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";
import apiClient from "@/lib/apiClient";
import {normalizePost, resolvePostPayload } from "./mapper";
import type {
  NewsfeedApiResponse,
  NewsfeedResponse,
  Post,
} from "./types";

export const createPost = async (data: CreatePostCommand): Promise<Post> => {
  const res = await apiClient.post("/api/posts", data);
  return resolvePostPayload(res.data);
};

export const likePost = async (postId: string): Promise<Post> => {
  const res = await apiClient.post<Post>(`/api/posts/${postId}/like`);
  return res.data;
};

export async function getPersonalNewsfeed(
  userId: string,
  params: { cursor?: string; pageSize?: number } = {},
): Promise<NewsfeedResponse> {
  const res = await apiClient.get<NewsfeedApiResponse>(`/api/newsfeed/${userId}`,
    {
      params: {
        Cursor: params.cursor ?? "",
        PageSize: params.pageSize,
      },
    },
  );

  const payload = res.data ?? {};
  const posts = Array.isArray(payload.data) ? payload.data.map(normalizePost) : [];

  return {
    posts,
    hasMore: Boolean(payload.hasMore),
    cursor: payload.cursor ?? null,
  };
}