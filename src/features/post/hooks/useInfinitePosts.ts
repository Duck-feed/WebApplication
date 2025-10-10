import { useCallback, useEffect, useMemo, useState } from "react";
import { getPersonalNewsfeed } from "@/features/post/api";
import type { Post } from "@/features/post/types";
import { DEFAULT_QUERY } from "../constant";
import type { UseInfinitePostsResult } from "../types";

export function useInfinitePosts(
  userId: string | undefined,
  initialPageSize?: number,
): UseInfinitePostsResult {
  const pageSize = useMemo(
    () => initialPageSize ?? DEFAULT_QUERY.pageSize,
    [initialPageSize],
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      setCursor(null);
      setHasMore(false);
      setLoadingInitial(false);
      setLoadingMore(false);
      setError(null);
      return undefined;
    }

    let cancelled = false;

    const load = async () => {
      setLoadingInitial(true);
      setError(null);
      setPosts([]);
      setCursor(null);
      setHasMore(false);

      try {
        const response = await getPersonalNewsfeed(userId, {
          cursor: "",
          pageSize,
        });

        if (cancelled) return;
        setPosts(response.posts);
        setCursor(response.cursor);
        setHasMore(response.hasMore);
      } catch (err) {
        if (cancelled) return;
        const normalizedError =
          err instanceof Error ? err : new Error(String(err ?? "Failed to load posts"));
        setError(normalizedError);
      } finally {
        if (!cancelled) {
          setLoadingInitial(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [userId, pageSize, refreshKey]);

  const fetchNextPage = useCallback(async () => {
    if (!userId || loadingInitial || loadingMore) return;
    if (!hasMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const response = await getPersonalNewsfeed(userId, {
        cursor: cursor ?? "",
        pageSize,
      });

      setPosts((prev) => [...prev, ...response.posts]);
      setCursor(response.cursor);
      setHasMore(response.hasMore);
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err ?? "Failed to load posts"));
      setError(normalizedError);
    } finally {
      setLoadingMore(false);
    }
  }, [userId, loadingInitial, loadingMore, hasMore, cursor, pageSize]);

  const refresh = useCallback(() => {
    setRefreshKey((value) => value + 1);
  }, []);

  return {
    posts,
    loadingInitial,
    loadingMore,
    error,
    hasMore,
    fetchNextPage,
    refresh,
  };
}

export default useInfinitePosts;
