import { useEffect, useState } from "react";
import type { Post } from "@/features/post/types";
import { getPosts } from "@/features/post/api";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    getPosts()
      .then((data) => {
        if (mounted) setPosts(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return { posts, loading, error };
}
