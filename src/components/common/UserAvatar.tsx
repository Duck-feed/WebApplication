import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  name?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-14 w-14 text-lg",
}

export function UserAvatar({ src, name, size = "md" }: UserAvatarProps) {
  return (
    <Avatar className={sizeMap[size]}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>
        {name ? name.charAt(0).toUpperCase() : "?"}
      </AvatarFallback>
    </Avatar>
  )
}
