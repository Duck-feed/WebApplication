import { motion } from "framer-motion"
import SettingIcon from "@/components/icons/SettingIcon"
import NavItem from "./NavItem"
import { navItems } from "./navItems"

export function MobileTopbar() {
  return (
    <div className="mobile:hidden top-0 left-0 right-0 flex items-center z-10 h-16 relative">
      <div className="absolute left-1/2 transform items-center -translate-x-1/2">
        <img src="/assets/logo.png" alt="logo" className="w-24 h-16" />
      </div>
      <div className="flex items-center w-10 cursor-pointer ml-auto">
        <div className="[transform:rotateY(180deg)]">
          <SettingIcon />
        </div>
      </div>
    </div>
  )
}

interface MobileBottombarProps {
  active: string
  setActive: (id: string) => void
  setIsOpen: (v: boolean) => void
  showNavbar: boolean
}

export function MobileBottombar({
  active,
  setActive,
  setIsOpen,
  showNavbar,
}: MobileBottombarProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : 80 }}
      transition={{ duration: 0.3 }}
      className="mobile:hidden fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t flex justify-around items-center h-16 z-10"
    >
      {navItems(setIsOpen).map(({ id, icon: Icon, onClick }) => (
        <NavItem
          key={id}
          id={id}
          Icon={Icon}
          active={active}
          className="flex-1 mx-1 p-3"
          onClick={() => {
            setActive(id)
            onClick?.()
          }}
        />
      ))}
    </motion.div>
  )
}
