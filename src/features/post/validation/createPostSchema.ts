// features/post/validation/createPostSchema.ts
import { z } from "zod";

export const createPostSchema = z
  .object({
    content: z.string().max(1000, "Content must be at most 1000 characters").optional(),
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
  })
  .refine(
    (data) =>
      (data.content && data.content.trim().length > 0) || (data.media && data.media.length > 0),
    {
      message: "Either content or media is required.",
      path: ["content"],
    },
  );

export type CreatePostCommand = z.infer<typeof createPostSchema>;
