import { useEffect, useState } from "react";
import AddPostModal from "@/features/post/components/AddPostModal";
import DesktopSidebar from "./DesktopSidebar";
import { MobileBottombar, MobileTopbar } from "./MobileNavbar";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 5) setShowNavbar(false);
      else if (currentScrollY < lastScrollY - 5) setShowNavbar(true);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <DesktopSidebar active={active} setActive={setActive} setIsOpen={setIsOpen} />
      <MobileTopbar />
      <MobileBottombar
        active={active}
        setActive={setActive}
        setIsOpen={setIsOpen}
        showNavbar={showNavbar}
      />
      <AddPostModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
