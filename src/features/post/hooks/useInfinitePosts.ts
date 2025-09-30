import { useCallback, useEffect, useMemo, useState } from "react";
import { getPersonalNewsfeed } from "@/features/post/api";
import type { NewsfeedPagination, NewsfeedQuery, Post } from "@/features/post/types";
import { DEFAULT_QUERY } from "../constant";
import type { UseInfinitePostsResult } from "../types";

export function useInfinitePosts(
  userId: string | undefined,
  initialQuery: NewsfeedQuery = {},
): UseInfinitePostsResult {
  const resolvedQuery = useMemo(
    () => ({
      pageSize: initialQuery.pageSize ?? DEFAULT_QUERY.pageSize,
      sortField: initialQuery.sortField ?? DEFAULT_QUERY.sortField,
    }),
    [initialQuery.pageSize, initialQuery.sortField],
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<NewsfeedPagination | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      setPagination(null);
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
      setPagination(null);

      try {
        const response = await getPersonalNewsfeed(userId, {
          page: 1,
          pageSize: resolvedQuery.pageSize,
          sortField: resolvedQuery.sortField,
        });

        if (cancelled) return;
        setPosts(response.posts);
        setPagination(response.pagination);
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
  }, [userId, resolvedQuery.pageSize, resolvedQuery.sortField, refreshKey]);

  const fetchNextPage = useCallback(async () => {
    if (!userId || loadingInitial || loadingMore) return;
    if (!pagination) return;
    if (pagination.totalPages <= pagination.page) return;

    setLoadingMore(true);
    setError(null);

    try {
      const response = await getPersonalNewsfeed(userId, {
        page: pagination.page + 1,
        pageSize: resolvedQuery.pageSize,
        sortField: resolvedQuery.sortField,
      });

      setPosts((prev) => [...prev, ...response.posts]);
      setPagination(response.pagination);
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err ?? "Failed to load posts"));
      setError(normalizedError);
    } finally {
      setLoadingMore(false);
    }
  }, [
    userId,
    loadingInitial,
    loadingMore,
    pagination,
    resolvedQuery.pageSize,
    resolvedQuery.sortField,
  ]);

  const refresh = useCallback(() => {
    setRefreshKey((value) => value + 1);
  }, []);

  const hasMore = Boolean(pagination && pagination.page < pagination.totalPages);

  return {
    posts,
    pagination,
    loadingInitial,
    loadingMore,
    error,
    hasMore,
    fetchNextPage,
    refresh,
  };
}
