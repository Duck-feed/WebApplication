import SettingIcon from "@/components/icons/SettingIcon";
import NavItem from "./NavItem";
import { navItems } from "./navItems";

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
  setIsOpen: (v: boolean) => void;
}

export default function DesktopSidebar({ active, setActive, setIsOpen }: SidebarProps) {
  return (
    <div className="hidden mobile:flex flex-col fixed h-screen">
      <div className="flex justify-center items-center p-4">
        <img src="/assets/logo.png" alt="logo" className="w-24 h-16" />
      </div>

      <div className="flex flex-col items-center w-20 justify-center flex-1 gap-8">
        {navItems(setIsOpen).map(({ id, icon: Icon, onClick }) => (
          <NavItem
            key={id}
            id={id}
            Icon={Icon}
            active={active}
            className="mx-1 p-3 w-16"
            onClick={() => {
              setActive(id);
              onClick?.();
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center w-20 mb-8 cursor-pointer">
        <SettingIcon />
      </div>
    </div>
  );
}
