// features/post/validation/createPostSchema.ts
import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  visibility: z.string().min(1, "Visibility is required"),
  media: z
    .array(
      z.object({
        mediaId: z.string(),
        mediaUrl: z.string().url(),
        mediaType: z.string(),
      }),
    )
    .optional(),
});

export type CreatePostCommand = z.infer<typeof createPostSchema>;
