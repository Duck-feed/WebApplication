import clsx from "clsx";
import LogoutIcon from "@/components/icons/LogoutIcon";
import SettingIcon from "@/components/icons/SettingIcon";
import SettingWheelIcon from "@/components/icons/SettingWheelIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface SettingsMenuProps {
  trigger?: React.ReactNode;
  onOpenSettings?: () => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}

export default function SettingsMenu({
  trigger,
  onOpenSettings = () => {},
  align = "end",
  side = "bottom",
  sideOffset = 8,
  alignOffset,
  className,
}: SettingsMenuProps) {
  const { logout } = useAuth();

  const triggerNode = trigger ?? (
    <button
      type="button"
      aria-label="Open settings menu"
      className="cursor-pointer p-2 rounded-md hover:bg-gray-100 outline-none focus:outline-none"
    >
      <SettingIcon />
    </button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerNode}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={clsx("w-52", className)}
      >
        <DropdownMenuItem
          onClick={onOpenSettings}
          className="flex items-center gap-3 py-3 cursor-pointer"
        >
          <SettingWheelIcon />
          <span className="font-semibold">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => logout?.()}
          className="flex items-center gap-3 py-3 text-red-600 focus:text-red-700 cursor-pointer hover:bg-red-50"
        >
          <LogoutIcon />
          <span className="font-semibold">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
