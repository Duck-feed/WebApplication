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

export interface NewsfeedPagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface NewsfeedResponse {
  posts: Post[];
  pagination: NewsfeedPagination;
}

export interface NewsfeedQuery {
  page?: number;
  pageSize?: number;
  sortField?: string;
}

export interface ResolvedNewsfeedQuery {
  page: number;
  pageSize: number;
  sortField: string;
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
  currentPage?: number;
  pageSize?: number;
  total?: number;
  lastPage?: number;
  data?: NewsfeedApiPost[];
}

export type UseInfinitePostsResult = {
  posts: Post[];
  pagination: NewsfeedPagination | null;
  loadingInitial: boolean;
  loadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  fetchNextPage: () => void;
  refresh: () => void;
};

export type AddPostCardProps = Readonly<{
  onPostCreated?: () => void;
}>;

export type AddPostModalProps = Readonly<{
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void; // backward compatibility
  onPostCreated?: () => void;
}>;

export interface UsePostsResult {
  posts: Post[] | null;
  pagination: NewsfeedPagination | null;
  loading: boolean;
  error: Error | null;
  page: number;
  pageSize: number;
  sortField: string;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSortField: (sortField: string) => void;
  refresh: () => void;
}
