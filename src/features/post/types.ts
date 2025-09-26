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