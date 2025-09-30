import { useMemo, useState } from "react";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import CommentIcon from "@/components/icons/CommentIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import MoreIcon from "@/components/icons/MoreIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import type { Post } from "../types";

export default function PostCard({
  author,
  publishedAt,
  content,
  media,
  reactionCount,
  commentCount,
  isReactedByCurrentUser,
}: Post) {
  const [liked, setLiked] = useState(isReactedByCurrentUser);
  const [isDragging, setIsDragging] = useState(false);

  const displayAuthor = author?.fullName?.trim() || author?.userName?.trim() || "Unknown";
  const authorInitial = displayAuthor.charAt(0).toUpperCase();
  const avatarUrl = author?.avatarUrl ?? "";
  const displayTime = publishedAt ? timeAgo(publishedAt) : "";

  const imageUrls = useMemo(() => {
    if (!media) return [] as string[];
    return media
      .filter((item) => item.type === "image")
      .sort((a, b) => a.order - b.order)
      .map((item) => item.url);
  }, [media]);

  const displayedReactionCount = reactionCount + (liked ? 1 : 0) - (isReactedByCurrentUser ? 1 : 0);

  const handleImageClick = (img: string) => {
    if (!isDragging) {
      alert("Open image: " + img);
    }
  };

  return (
    <Card className="flex flex-col border-2 rounded-xl w-full max-w-[640px] pt-4 pb-4 bg-white">
      <div className="flex flex-row items-start pl-4">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage src={avatarUrl} alt={displayAuthor} />
          <AvatarFallback>{authorInitial}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="font-bold max-w-[150px] truncate cursor-pointer"
                title={displayAuthor}
              >
                {displayAuthor}
              </span>
              <span className="text-gray-500 text-sm">{displayTime}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full transition duration-150 hover:bg-gray-100 active:scale-75"
            >
              <MoreIcon />
            </Button>
          </div>

          <p className="mt-1 mb-2 pr-4 whitespace-pre-wrap [overflow-wrap:anywhere] text-sm sm:text-base">
            {content}
          </p>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <HorizontalScroll className="mt-2 pl-16 pr-5" onDragStateChange={setIsDragging}>
          {imageUrls.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`post-img-${idx}`}
              className="max-h-48 sm:h-52 md:h-56 w-auto h-auto rounded-xl flex-shrink-0 object-cover cursor-pointer"
              draggable={false}
              onClick={() => handleImageClick(img)}
            />
          ))}
          <div className="w-16 flex-shrink-0" />
        </HorizontalScroll>
      )}

      <CardFooter className="flex flex-row gap-4 mt-3 ml-10 p-0 pl-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLiked((prev) => !prev)}
          className="group flex items-center gap-2 rounded-full hover:bg-gray-100 active:scale-75 transition"
        >
          <HeartIcon active={liked} />
          <span className="text-sm sm:text-base">{displayedReactionCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="group flex items-center gap-2 rounded-full hover:bg-gray-100 active:scale-75 transition"
        >
          <CommentIcon />
          <span className="text-sm sm:text-base">{commentCount}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
