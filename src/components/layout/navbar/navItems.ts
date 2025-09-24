import BellIcon from "@/components/icons/BellIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { useNavigate } from "react-router-dom";

export const navItems = (
  navigate: ReturnType<typeof useNavigate>,
  setIsOpen: (v: boolean) => void,
) => [
  { id: "home", icon: HomeIcon, onClick: () => navigate("/") },
  { id: "search", icon: SearchIcon, onClick: () => console.log("Search something") },
  { id: "plus", icon: PlusIcon, onClick: () => setIsOpen(true) },
  { id: "bell", icon: BellIcon, onClick: () => navigate("/notifications") },
  { id: "profile", icon: ProfileIcon, onClick: () => console.log("Go Profile") },
];
