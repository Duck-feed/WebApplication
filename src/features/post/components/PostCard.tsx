import { useState } from "react"
import { Card, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import HeartIcon from "@/components/icons/HeartIcon"
import CommentIcon from "@/components/icons/CommentIcon"
import MoreIcon from "@/components/icons/MoreIcon"
import HorizontalScroll from "@/components/common/HorizontalScroll"
import type { Post } from "../types"

export default function PostCard({
  author,
  avatar,
  time,
  content,
  images,
  likes,
  comments,
}: Post) {
  const [liked, setLiked] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleImageClick = (img: string) => {
    if (!isDragging) {
      alert("Open image: " + img)
    }
  }

  return (
    <Card className="flex flex-col border-2 rounded-xl w-full max-w-[640px] pt-4 pb-4 bg-white">
      {/* Header */}
      <div className="flex flex-row items-start pl-4">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* Author + time + more */}
          <div className="flex items-center justify-between pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="font-bold max-w-[150px] truncate cursor-pointer"
                title={author}
              >
                {author}
              </span>
              <span className="text-gray-500 text-sm">{time}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full transition duration-150 hover:bg-gray-100 active:scale-75"
            >
              <MoreIcon />
            </Button>
          </div>

          {/* Content */}
          <p className="mt-1 mb-2 pr-4 whitespace-pre-wrap [overflow-wrap:anywhere] text-sm sm:text-base">
            {content}
          </p>
        </div>
      </div>

      {/* Images carousel */}
      {images && images.length > 0 && (
        <HorizontalScroll
          className="mt-2 pl-16 pr-5"
          onDragStateChange={setIsDragging}
        >
          {images.map((img, idx) => (
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

      {/* Footer */}
      <CardFooter className="flex flex-row gap-4 mt-3 ml-10 p-0 pl-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLiked((prev) => !prev)}
          className="group flex items-center gap-2 rounded-full hover:bg-gray-100 active:scale-75 transition"
        >
          <HeartIcon active={liked} />
          <span className="text-sm sm:text-base">
            {likes + (liked ? 1 : 0)}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="group flex items-center gap-2 rounded-full hover:bg-gray-100 active:scale-75 transition"
        >
          <CommentIcon />
          <span className="text-sm sm:text-base">{comments}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
