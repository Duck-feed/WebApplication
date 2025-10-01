// features/post/constant.ts
import type { ResolvedNewsfeedQuery } from "./types";

export const POST_VISIBILITY = {
  PUBLIC_ALL: "PUBLIC_ALL",
  PUBLIC_FRIEND: "PUBLIC_FRIEND",
  ONLY_ME: "ONLY_ME",
};

export const MEDIA_TYPE = {
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
};

export const PostVisibility = {
  ONLY_ME: 0,
  PUBLIC_ALL: 1,
  PUBLIC_FRIEND: 2,
};

export const DEFAULT_QUERY: ResolvedNewsfeedQuery = {
  page: 1,
  pageSize: 10,
  sortField: "PublishedAt",
};

export type PostVisibility = (typeof PostVisibility)[keyof typeof PostVisibility];
