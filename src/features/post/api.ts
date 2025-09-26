import apiClient from "@/lib/apiClient";
import type { Post, NewsfeedQuery, NewsfeedResponse } from "./types";
import type { CreatePostCommand } from "@/features/post/validation/createPostSchema";

type ResolvedNewsfeedQuery = {
  page: number;
  pageSize: number;
  sortField: string;
};

const DEFAULT_NEWSFEED_QUERY: ResolvedNewsfeedQuery = {
  page: 1,
  pageSize: 10,
  sortField: "PublishedAt",
};

type NewsfeedApiMedia = {
  id?: string;
  url?: string;
  type?: string;
  order?: number;
};

type NewsfeedApiAuthor = {
  id?: string;
  userName?: string | null;
  fullName?: string | null;
  avatar?: string | null;
};

type NewsfeedApiPost = {
  id: string;
  content?: string | null;
  publishedAt?: string | null;
  author?: NewsfeedApiAuthor;
  media?: NewsfeedApiMedia[];
  commentCount?: number | null;
  reactionCount?: number | null;
  isReactedByCurrentUser?: boolean | null;
};

type NewsfeedApiResponse = {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  lastPage?: number;
  data?: NewsfeedApiPost[];
};

const normalizePost = (apiPost: NewsfeedApiPost): Post => {
  const author = apiPost.author ?? {};
  const media = Array.isArray(apiPost.media) ? apiPost.media : [];

  return {
    id: apiPost.id,
    content: apiPost.content ?? "",
    publishedAt: apiPost.publishedAt ?? "",
    author: {
      id: author.id ?? "",
      userName: author.userName ?? null,
      fullName: author.fullName ?? null,
      avatarUrl: author.avatar ?? null,
    },
    media: media.map((item, index) => ({
      id: item?.id ?? `${apiPost.id}-media-${index}`,
      url: item?.url ?? "",
      type: item?.type ?? "image",
      order: typeof item?.order === "number" ? item.order : index,
    })),
    commentCount: typeof apiPost.commentCount === "number" ? apiPost.commentCount : 0,
    reactionCount: typeof apiPost.reactionCount === "number" ? apiPost.reactionCount : 0,
    isReactedByCurrentUser: Boolean(apiPost.isReactedByCurrentUser),
  };
};

export const getPersonalNewsfeed = async (
  userId: string,
  params: NewsfeedQuery = {},
): Promise<NewsfeedResponse> => {
  const query: ResolvedNewsfeedQuery = {
    page: params.page ?? DEFAULT_NEWSFEED_QUERY.page,
    pageSize: params.pageSize ?? DEFAULT_NEWSFEED_QUERY.pageSize,
    sortField: params.sortField ?? DEFAULT_NEWSFEED_QUERY.sortField,
  };

  const res = await apiClient.get<NewsfeedApiResponse>(`/api/newsfeed/${userId}`, {
    params: query,
  });

  const payload = res.data ?? {};
  const posts = Array.isArray(payload.data) ? payload.data.map(normalizePost) : [];

  const resolvedPageSize = payload.pageSize ?? query.pageSize;
  const totalItems = payload.total ?? posts.length;
  const totalPages =
    payload.lastPage ??
    (resolvedPageSize > 0 ? Math.ceil(totalItems / resolvedPageSize) : 0);

  return {
    posts,
    pagination: {
      page: payload.currentPage ?? query.page,
      pageSize: resolvedPageSize,
      totalItems,
      totalPages,
    },
  };
};

export const getPosts = async (userId: string, params?: NewsfeedQuery): Promise<Post[]> => {
  const response = await getPersonalNewsfeed(userId, params);
  return response.posts;
};

export const createPost = async (data: CreatePostCommand): Promise<Post> => {
  const res = await apiClient.post<Post>("/api/posts", data);
  return res.data;
};

export const likePost = async (postId: string): Promise<Post> => {
  const res = await apiClient.post<Post>(`/api/posts/${postId}/like`);
  return res.data;
};
