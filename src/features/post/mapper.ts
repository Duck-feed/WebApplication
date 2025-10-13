import { DEFAULT_QUERY } from "./constant";
import type {
  NewsfeedApiPost,
  NewsfeedApiResponse,
  NewsfeedQuery,
  NewsfeedResponse,
  Post,
  ResolvedNewsfeedQuery,
} from "./types";

export const normalizePost = (apiPost: NewsfeedApiPost): Post => {
    const author = apiPost.author ?? {};
    const media = Array.isArray(apiPost.media) ? apiPost.media : [];

    return {
        id: apiPost.id,
        content: apiPost.content ?? "",
        publishedAt: apiPost.publishedAt ?? "",
        author: {
            id: author.id ?? "",
            userName: author.userName ?? null,
            fullName: author.fullName ?? null,
            avatarUrl: author.avatar ?? null,
        },
        media: media.map((item, index) => ({
            id: item?.id ?? `${apiPost.id}-media-${index}`,
            url: item?.url ?? "",
            type: item?.type ?? "image",
            order: typeof item?.order === "number" ? item.order : index,
        })),
        commentCount: typeof apiPost.commentCount === "number" ? apiPost.commentCount : 0,
        reactionCount: typeof apiPost.reactionCount === "number" ? apiPost.reactionCount : 0,
        isReactedByCurrentUser: Boolean(apiPost.isReactedByCurrentUser),
    };
};

export const unwrapPostPayload = (payload: unknown): unknown => {
    let current = payload;

    while (current && typeof current === "object") {
        const container = current as { data?: unknown; post?: unknown; result?: unknown };

        if (container.data !== undefined) {
            current = container.data;
            continue;
        }

        if (container.post !== undefined) {
            current = container.post;
            continue;
        }

        if (container.result !== undefined) {
            current = container.result;
            continue;
        }

        break;
    }

    return current;
};

export const isNormalizedPost = (value: unknown): value is Post => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Post;

    return (
        typeof candidate.id === "string" &&
        typeof candidate.content === "string" &&
        typeof candidate.publishedAt === "string" &&
        typeof candidate.commentCount === "number" &&
        typeof candidate.reactionCount === "number" &&
        typeof candidate.isReactedByCurrentUser === "boolean" &&
        Array.isArray(candidate.media) &&
        typeof candidate.author === "object" &&
        candidate.author !== null
    );
};

export const resolvePostPayload = (payload: unknown): Post => {
    const unwrapped = unwrapPostPayload(payload);

    if (isNormalizedPost(unwrapped)) {
        return unwrapped;
    }

    if (unwrapped && typeof unwrapped === "object") {
        return normalizePost(unwrapped as NewsfeedApiPost);
    }

    throw new Error("Invalid post payload received from API");
};

export const resolveNewsfeedQuery = (params: NewsfeedQuery): ResolvedNewsfeedQuery => ({
  pageSize: params.pageSize ?? DEFAULT_QUERY.pageSize,
  sortField: params.sortField ?? DEFAULT_QUERY.sortField,
});

export const mapNewsfeedResponse = (
  payload: NewsfeedApiResponse,
  _query: ResolvedNewsfeedQuery,
): NewsfeedResponse => {
  const posts = Array.isArray(payload.data) ? payload.data.map(normalizePost) : [];

  return {
    posts,
    hasMore: Boolean(payload.hasMore),
    cursor: payload.cursor ?? null,
  };
};
