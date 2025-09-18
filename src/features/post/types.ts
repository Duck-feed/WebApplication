// features/post/types.ts
export interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  images: string[];
  content: string;
  likes: number;
  comments: number;
}

export interface CreatePostCommand {
  content: string;
  media?: Media[];
  visibility: string;
}

export interface Media {
  mediaId: string;
  mediaUrl: string;
  mediaType: string;
}
