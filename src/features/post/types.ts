// features/post/types.ts
export interface PostAuthor {
  id: string;
  userName: string | null;
  fullName: string | null;
  avatarUrl: string | null;
}

export interface PostMedia {
  id: string;
  url: string;
  type: string;
  order: number;
}

export interface Post {
  id: string;
  content: string;
  publishedAt: string;
  author: PostAuthor;
  media: PostMedia[];
  commentCount: number;
  reactionCount: number;
  isReactedByCurrentUser: boolean;
}

export interface NewsfeedApiMedia {
  id?: string;
  url?: string;
  type?: string;
  order?: number;
}

export interface NewsfeedApiAuthor {
  id?: string;
  userName?: string | null;
  fullName?: string | null;
  avatar?: string | null;
}

export interface NewsfeedApiPost {
  id: string;
  content?: string | null;
  publishedAt?: string | null;
  author?: NewsfeedApiAuthor;
  media?: NewsfeedApiMedia[];
  commentCount?: number | null;
  reactionCount?: number | null;
  isReactedByCurrentUser?: boolean | null;
}

export interface NewsfeedApiResponse {
  data?: NewsfeedApiPost[];
  hasMore?: boolean;
  cursor?: string | null;
}

export interface NewsfeedResponse {
  posts: Post[];
  hasMore: boolean;
  cursor: string | null;
}

// Query types for feed requests (cursor-based API)
export interface NewsfeedQuery {
  pageSize?: number;
  sortField?: string;
}

export interface ResolvedNewsfeedQuery {
  pageSize: number;
  sortField: string;
}

export type AddPostCardProps = Readonly<{
  onPostCreated?: () => void;
}>;

export type AddPostModalProps = Readonly<{
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void; // backward compatibility
  onPostCreated?: () => void;
}>;

export type UseInfinitePostsResult = {
  posts: Post[];
  loadingInitial: boolean;
  loadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  fetchNextPage: () => void;
  refresh: () => void;
};
