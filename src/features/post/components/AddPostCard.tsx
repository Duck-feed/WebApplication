import { useState } from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AddPostModal from "@/features/post/components/AddPostModal";

export default function AddPostCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="w-full max-w-[640px] border rounded-xl bg-white">
        <CardContent className="flex items-center gap-3 h-20 px-4 py-2">
          {/* Avatar */}
          <UserAvatar
            src="https://ruinmyweek.com/wp-content/uploads/2020/09/the-is-for-me-meme-calls-out-history-greediest-villains-1.jpg"
            name="sample name"
            size="md"
          />
          {/* Input trigger */}
          <Input
            type="text"
            placeholder="What's new"
            className="flex-1 cursor-pointer border-transparent shadow-none hover:cursor-text"
            readOnly
            onClick={() => setIsOpen(true)}
          />

          {/* Post button */}
          <Button
            variant="outline"
            className="font-semibold rounded-xl px-4"
            onClick={() => setIsOpen(true)}
          >
            Post
          </Button>
        </CardContent>
      </Card>

      {/* Modal form */}
      <AddPostModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
