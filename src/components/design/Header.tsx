import { useEffect, useRef, useState } from "react";
import NotificationDrawer from "../notification/NotificationDrawer";

const Header = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!bellRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="w-full h-[80px] bg-[#FFCC80] flex items-center justify-between px-[24px] shadow-md font-sans box-border">
      <img src="/logo.svg" alt="logo" className="h-[60px]" />
      <div className="flex items-center gap-[25px] pr-[25px]">
        <img
          src="/bell.svg"
          ref={bellRef}
          onClick={() => setOpen(!open)}
          className="w-[43px] h-[43px] cursor-pointer"
        />
        <img src="/profile.svg" className="w-[43px] h-[43px]" />

        <NotificationDrawer
          open={open}
          onClose={() => setOpen(false)}
          anchorRef={bellRef}
        />
      </div>
    </header>
  );
};

export default Header;
