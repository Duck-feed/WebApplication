import { useState } from "react"
import ImageIcon from "@/components/icons/ImageIcon"
import FaceIcon from "@/components/icons/FaceIcon"
import TextareaAutosize from "react-textarea-autosize"
import { useAuth } from "@/features/auth/hooks/useAuth"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/common/UserAvatar"

export default function NewPostCard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useAuth()
  const [mediaList, setMediaList] = useState<string[]>(Array(36).fill("Media"))

  if (!user) return null

  const removeMedia = (index: number) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col bg-white p-4 sm:max-w-[640px] sm:max-h-[90vh] sm:rounded-xl max-w-full max-h-screen">
        {/* Header */}
        <DialogHeader className="flex flex-col items-center relative">
          <DialogTitle className="text-center mt-3">New post</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1"
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogHeader>

        {/* User avatar + textarea */}
        <div className="flex flex-row gap-1 w-full mt-2">
          <div className="flex flex-start mb-2 mr-1">
            <UserAvatar src={user?.avatar} name={user?.name} size="md"/>
          </div>
          <div className="flex-1 mr-3 sm:mr-6 md:mr-12">
            <span className="font-bold">{user?.name}</span>
            <TextareaAutosize
              className="w-full resize-none outline-none"
              placeholder="What's on your mind?"
              minRows={1}
              maxRows={10}
            />
            <div className="flex items-center gap-3 mb-3 text-gray-600">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-black"
              >
                <ImageIcon />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-black"
              >
                <FaceIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Media grid */}
        <div className="flex-1 overflow-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ml-12">
          {mediaList.map((media, index) => (
            <div
              key={index}
              className="relative bg-gray-300 rounded-md flex items-center justify-center h-20"
            >
              <span className="text-sm">{media}</span>
              <Button
                onClick={() => removeMedia(index)}
                size="icon"
                variant="secondary"
                className="absolute top-1 right-1 w-5 h-5 rounded-full p-0 text-xs"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-3">
          <Button variant="outline">Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
