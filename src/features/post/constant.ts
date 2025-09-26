// features/post/constant.ts

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

export type PostVisibility = (typeof PostVisibility)[keyof typeof PostVisibility];
