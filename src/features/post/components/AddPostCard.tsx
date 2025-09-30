import { useState } from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AddPostModal from "@/features/post/components/AddPostModal";
import type { AddPostCardProps } from "../types";

export default function AddPostCard({ onPostCreated }: AddPostCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const displayName = user?.profileName || user?.username || "Guest";

  return (
    <>
      <Card className="w-full max-w-[640px] border rounded-xl bg-white">
        <CardContent className="flex items-center gap-3 h-20 px-4 py-2">
          {/* Avatar */}
          <UserAvatar src={user?.avatar || undefined} name={displayName} size="md" />
          {/* Input trigger */}
          <Input
            type="text"
            placeholder={user ? "What's new" : "Sign in to share something"}
            className="flex-1 cursor-pointer border-transparent shadow-none hover:cursor-text"
            readOnly
            onClick={() => user && setIsOpen(true)}
          />

          {/* Post button */}
          <Button
            variant="outline"
            className="font-semibold rounded-xl px-4"
            onClick={() => user && setIsOpen(true)}
            disabled={!user}
          >
            Post
          </Button>
        </CardContent>
      </Card>

      {/* Modal form */}
      <AddPostModal isOpen={isOpen} onOpenChange={setIsOpen} onPostCreated={onPostCreated} />
    </>
  );
}
