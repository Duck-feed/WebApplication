import { useAuth } from "@/features/auth/hooks/useAuth"
import NewPostCard from "@/features/post/components/NewPostCard"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "./common/UserAvatar"

export default function AddPostCard() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  if (!user) return null

  return (
    <>
      <Card className="w-full max-w-[640px] border-2 rounded-xl bg-white">
        <CardContent className="flex items-center gap-3 h-20 px-4 py-2">
          {/* Avatar */}
          <UserAvatar src={user?.avatar} name={user?.name} size="md" />
          {/* Input trigger */}
          <Input
            type="text"
            placeholder="What's new"
            className="flex-1 cursor-pointer"
            readOnly
            onClick={() => setIsOpen(true)}
          />

          {/* Post button */}
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Post
          </Button>
        </CardContent>
      </Card>

      {/* Modal form */}
      <NewPostCard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
