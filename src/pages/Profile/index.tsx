import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePosts, AddPostCard, PostCard, PostCardSkeleton } from "@/features/post";
import { ProfileHeader, ProfileCard } from "@/features/profile";

type ProfileTab = "posts" | "media";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { posts, loading, error } = usePosts(user?.id);
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  if (!user) {
    return <div>Loading user...</div>;
  }

  const displayName = (() => {
    const byProfile = user.profileName?.trim();
    if (byProfile) return byProfile;
    const names = [user.firstName, user.lastName]
      .map((part) => part?.trim())
      .filter((part): part is string => Boolean(part && part.length));
    if (names.length > 0) return names.join(" ");
    return user.username || "Guest";
  })();

  const shouldShowSkeleton = authLoading || loading || posts === null;

  return (
    <div className="flex flex-col items-center gap-4 pb-16">
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
          <AddPostCard />
          {shouldShowSkeleton
            ? Array.from({ length: 3 }).map((_, index) => (
                <PostCardSkeleton key={`profile-post-skeleton-${index}`} />
              ))
            : error
            ? (
                <Card>
                  <CardContent className="p-6 text-center text-red-500">
                    {error.message || "Failed to load posts"}
                  </CardContent>
                </Card>
              )
            : posts && posts.length > 0
            ? (
                posts.map((post) => <PostCard key={post.id} {...post} />)
              )
            : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    You have not shared any posts yet.
                  </CardContent>
                </Card>
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
