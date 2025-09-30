import BaseHeader from "@/components/layout/BaseHeader";

interface ProfileHeaderProps {
  username: string;
  currentUsername: string;
}

export default function ProfileHeader({ username, currentUsername }: ProfileHeaderProps) {
  const isOwner = username === currentUsername;

  return (
    <BaseHeader>
      <h1 className="text-lg font-bold">{isOwner ? "Profile" : username}</h1>
    </BaseHeader>
  );
}
