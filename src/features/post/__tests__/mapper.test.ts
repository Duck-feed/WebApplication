import {
  normalizePost,
  unwrapPostPayload,
  resolvePostPayload,
  resolveNewsfeedQuery,
  mapNewsfeedResponse,
} from "@/features/post/mapper";
import type { NewsfeedApiPost, ResolvedNewsfeedQuery } from "@/features/post/types";

describe("post mapper", () => {
  describe("normalizePost", () => {
    it("fills in sensible defaults for missing optional fields", () => {
      const apiPost = {
        id: "post-1",
      } as NewsfeedApiPost;

      const normalized = normalizePost(apiPost);

      expect(normalized).toEqual({
        id: "post-1",
        content: "",
        publishedAt: "",
        author: {
          id: "",
          userName: null,
          fullName: null,
          avatarUrl: null,
        },
        media: [],
        commentCount: 0,
        reactionCount: 0,
        isReactedByCurrentUser: false,
      });
    });

    it("maps provided author and media data while preserving order fallbacks", () => {
      const apiPost: NewsfeedApiPost = {
        id: "post-2",
        content: "hello",
        publishedAt: "2024-01-01T00:00:00Z",
        author: {
          id: "author-1",
          userName: "coder",
          fullName: "Codex User",
          avatar: "https://example.com/avatar.png",
        },
        media: [
          { url: "https://example.com/image.png" },
          { id: "media-2", url: "https://example.com/video.mp4", type: "video", order: 42 },
        ],
        commentCount: 5,
        reactionCount: 10,
        isReactedByCurrentUser: true,
      };

      const normalized = normalizePost(apiPost);

      expect(normalized.media).toEqual([
        {
          id: "post-2-media-0",
          url: "https://example.com/image.png",
          type: "image",
          order: 0,
        },
        {
          id: "media-2",
          url: "https://example.com/video.mp4",
          type: "video",
          order: 42,
        },
      ]);
      expect(normalized.author).toEqual({
        id: "author-1",
        userName: "coder",
        fullName: "Codex User",
        avatarUrl: "https://example.com/avatar.png",
      });
      expect(normalized.commentCount).toBe(5);
      expect(normalized.reactionCount).toBe(10);
      expect(normalized.isReactedByCurrentUser).toBe(true);
    });
  });

  describe("unwrapPostPayload", () => {
    it("walks through known container keys until it finds the post", () => {
      const payload = {
        data: {
          result: {
            post: {
              id: "post-3",
            },
          },
        },
      };

      expect(unwrapPostPayload(payload)).toEqual({ id: "post-3" });
    });

    it("returns the original value when no known wrapper is present", () => {
      const payload = { id: "post-raw" };

      expect(unwrapPostPayload(payload)).toBe(payload);
    });
  });

  describe("resolvePostPayload", () => {
    it("returns the payload untouched when it is already normalized", () => {
      const normalized = normalizePost({
        id: "post-4",
      } as NewsfeedApiPost);

      const resolved = resolvePostPayload(normalized);

      expect(resolved).toBe(normalized);
    });

    it("normalizes wrapped API payloads", () => {
      const payload = {
        data: {
          post: {
            id: "post-5",
            content: "from api",
          },
        },
      };

      const resolved = resolvePostPayload(payload);

      expect(resolved).toMatchObject({
        id: "post-5",
        content: "from api",
      });
      expect(resolved.author).toMatchObject({ id: "" });
    });

    it("throws when the payload cannot produce a post", () => {
      expect(() => resolvePostPayload(undefined)).toThrow(
        "Invalid post payload received from API",
      );
    });
  });

  describe("resolveNewsfeedQuery", () => {
    it("fills unspecified fields from the default query", () => {
      const resolved = resolveNewsfeedQuery({ pageSize: 25 });

      expect(resolved).toEqual<ResolvedNewsfeedQuery>({
        pageSize: 25,
        sortField: "PublishedAt",
      });
    });
  });

  describe("mapNewsfeedResponse", () => {
    it("normalizes posts and exposes continuation fields", () => {
      const query: ResolvedNewsfeedQuery = {
        pageSize: 5,
        sortField: "PublishedAt",
      };
      const response = mapNewsfeedResponse(
        {
          hasMore: true,
          cursor: "abc123",
          data: [
            { id: "post-6", content: "hello" },
            { id: "post-7" },
          ],
        },
        query,
      );

      expect(response.posts).toHaveLength(2);
      expect(response.posts[0]).toMatchObject({ id: "post-6", content: "hello" });
      expect(response.posts[1]).toMatchObject({ id: "post-7", content: "" });

      expect(response.hasMore).toBe(true);
      expect(response.cursor).toBe("abc123");
    });
  });
});
