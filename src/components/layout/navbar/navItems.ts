import HomeIcon from "@/components/icons/HomeIcon"
import SearchIcon from "@/components/icons/SearchIcon"
import PlusIcon from "@/components/icons/PlusIcon"
import BellIcon from "@/components/icons/BellIcon"
import ProfileIcon from "@/components/icons/ProfileIcon"

export const navItems = (setIsOpen: (v: boolean) => void) => [
  { id: "home", icon: HomeIcon, onClick: () => console.log("Go Home") },
  { id: "search", icon: SearchIcon, onClick: () => console.log("Search something") },
  { id: "plus", icon: PlusIcon, onClick: () => setIsOpen(true) },
  { id: "bell", icon: BellIcon, onClick: () => console.log("Show notifications") },
  { id: "profile", icon: ProfileIcon, onClick: () => console.log("Go Profile") },
]
