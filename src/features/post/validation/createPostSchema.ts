// features/post/validation/createPostSchema.ts
import { z } from "zod";
import { PostVisibility } from "../constant";

export const createPostSchema = z
  .object({
    content: z.string().max(1000, "Content must be at most 1000 characters").optional(),
    visibility: z.union([
      z.literal(PostVisibility.ONLY_ME),
      z.literal(PostVisibility.PUBLIC_ALL),
      z.literal(PostVisibility.PUBLIC_FRIEND),
    ]),
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
      path: ["media"],
    },
  );

export type CreatePostCommand = z.infer<typeof createPostSchema>;
