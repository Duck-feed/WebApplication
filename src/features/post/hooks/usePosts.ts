import { useEffect, useMemo, useState } from "react";
import { getPersonalNewsfeed } from "@/features/post/api";
import type { NewsfeedPagination, NewsfeedQuery, Post } from "@/features/post/types";
import { DEFAULT_QUERY } from "../constant";
import type { ResolvedNewsfeedQuery, UsePostsResult } from "../types";

export function usePosts(
  userId: string | undefined,
  initialQuery: NewsfeedQuery = {},
): UsePostsResult {
  const mergedInitialQuery = useMemo<ResolvedNewsfeedQuery>(
    () => ({
      page: initialQuery.page ?? DEFAULT_QUERY.page,
      pageSize: initialQuery.pageSize ?? DEFAULT_QUERY.pageSize,
      sortField: initialQuery.sortField ?? DEFAULT_QUERY.sortField,
    }),
    [initialQuery.page, initialQuery.pageSize, initialQuery.sortField],
  );

  const [query, setQuery] = useState<ResolvedNewsfeedQuery>(mergedInitialQuery);
  const [reloadKey, setReloadKey] = useState(0);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [pagination, setPagination] = useState<NewsfeedPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    setQuery(mergedInitialQuery);
  }, [mergedInitialQuery.page, mergedInitialQuery.pageSize, mergedInitialQuery.sortField]);

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    setLoading(true);
    setDelayedLoading(true);

    getPersonalNewsfeed(userId, query)
      .then((response) => {
        if (!mounted) return;
        setPosts(response.posts);
        setPagination(response.pagination);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        const normalizedError =
          err instanceof Error ? err : new Error(String(err ?? "Failed to load posts"));
        setError(normalizedError);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [userId, query.page, query.pageSize, query.sortField, reloadKey]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setDelayedLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const setPage = (page: number) => setQuery((prev) => ({ ...prev, page }));
  const setPageSize = (pageSize: number) => setQuery((prev) => ({ ...prev, pageSize }));
  const setSortField = (sortField: string) => setQuery((prev) => ({ ...prev, sortField }));
  const refresh = () => setReloadKey((key) => key + 1);

  return {
    posts,
    pagination,
    loading: delayedLoading,
    error,
    page: query.page,
    pageSize: query.pageSize,
    sortField: query.sortField,
    setPage,
    setPageSize,
    setSortField,
    refresh,
  };
}
