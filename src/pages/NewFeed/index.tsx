import FeedHeader from "@/components/FeedHeader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AddPostCard, PostCard, PostCardSkeleton, useInfinitePosts } from "@/features/post";

export default function NewFeed() {
  const { user, loading: authLoading } = useAuth();
  const { posts, loadingInitial, error } = useInfinitePosts(user?.id);

  const shouldShowSkeleton = authLoading || loadingInitial;

  return (
    <div className="flex flex-col items-center gap-3">
      <FeedHeader />
      <AddPostCard />
      {shouldShowSkeleton ? (
        Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={`newsfeed-post-skeleton-${index}`} />
        ))
      ) : error ? (
        <div className="w-full max-w-[640px] text-center text-red-500">{error.message}</div>
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <div className="w-full max-w-[640px] text-center text-gray-500">No posts to show yet.</div>
      )}
    </div>
  );
}
