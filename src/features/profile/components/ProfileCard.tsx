import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProfileTab = "posts" | "media";

interface ProfileCardProps {
  displayName: string;
  username?: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  isOwner: boolean;
  onEditProfile: () => void;
  activeTab: ProfileTab;
  onChangeTab: (tab: ProfileTab) => void;
}

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "media", label: "Media" },
];

export default function ProfileCard({
  displayName,
  username,
  avatar,
  bio,
  followers,
  following,
  isOwner,
  onEditProfile,
  activeTab,
  onChangeTab,
}: ProfileCardProps) {
  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-semibold">{displayName}</CardTitle>
          {username && <CardDescription>@{username}</CardDescription>}
        </div>
        <UserAvatar src={avatar} name={displayName} size="hg" />
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {/* Bio */}
        {bio ? (
          <p className="text-gray-700 whitespace-pre-wrap break-words">{bio}</p>
        ) : (
          <p className="text-gray-500">
            Tell people a little about yourself. Add a short bio once profile editing is ready.
          </p>
        )}

        {/* Followers / Following */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>
            <span className="font-semibold text-gray-900">{followers}</span> followers
          </span>
          <span>
            <span className="font-semibold text-gray-900">{following}</span> following
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-4 w-full pb-0">
        {isOwner ? (
          <Button
            variant="outline"
            className="w-full rounded-xl font-semibold"
            onClick={onEditProfile}
          >
            Edit profile
          </Button>
        ) : (
          <Button className="w-full rounded-xl font-semibold">Follow</Button>
        )}

        {/* Tabs */}
        <div className="flex rounded-xl bg-white overflow-hidden w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex-1 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.id ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 border-b-[1px] border-black"
                  style={{ width: "80%" }}
                />
              )}
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
