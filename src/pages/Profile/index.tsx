import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AddPostCard, type Post, PostCard, PostCardSkeleton, useInfinitePosts } from "@/features/post";
import { ProfileCard, ProfileHeader } from "@/features/profile";
import { getDisplayName } from "@/lib/utils";

type ProfileTab = "posts" | "media";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { posts, loadingInitial, loadingMore, error, hasMore, fetchNextPage, refresh } =
    useInfinitePosts(user?.id);
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const { ref: sentinelRef, inView } = useInView({ rootMargin: "0px 0px 240px 0px" });
  const displayName = getDisplayName(user);

  useEffect(() => {
    if (!inView) return;
    if (authLoading || loadingInitial || loadingMore) return;
    if (!hasMore) return;
    fetchNextPage();
  }, [inView, hasMore, loadingInitial, loadingMore, fetchNextPage, authLoading]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  const shouldShowSkeleton = authLoading || loadingInitial;
  const showEmptyState = !shouldShowSkeleton && !error && posts.length === 0 && !hasMore;

  return (
    <div className="flex flex-col items-center gap-4 pb-8">
      <ProfileHeader username={user.username} currentUsername={user.username} />

      <section className="w-full max-w-[640px]">
        <ProfileCard
          displayName={displayName}
          username={user.username}
          avatar={user.avatar}
          bio={user.bio}
          followers={user.noFollowers}
          following={user.noFollowing}
          isOwner={true}
          onEditProfile={() => alert("Profile editing is coming soon.")}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      </section>

      {activeTab === "posts" ? (
        <section className="w-full max-w-[640px] flex flex-col gap-3">
          <AddPostCard onPostCreated={refresh} />

          {shouldShowSkeleton ? (
            Array.from({ length: 3 }).map((_, index) => (
              <PostCardSkeleton key={`profile-post-skeleton-${index}`} />
            ))
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center text-red-500">
                {error.message || "Failed to load posts"}
              </CardContent>
            </Card>
          ) : showEmptyState ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                You have not shared any posts yet.
              </CardContent>
            </Card>
          ) : (
            <>
              {posts.map((post: Post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </>
          )}

          {!shouldShowSkeleton && !error && posts.length > 0 && (
            <div ref={sentinelRef} className="flex flex-col gap-3 w-full">
              {loadingMore ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <PostCardSkeleton key={`profile-post-skeleton-more-${index}`} />
                ))
              ) : !hasMore ? (
                <div className="text-center text-gray-400 py-2">You're all caught up</div>
              ) : null}
            </div>
          )}
        </section>
      ) : (
        <section className="w-full max-w-[640px]">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Media will live here once you start attaching photos or videos.
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}

