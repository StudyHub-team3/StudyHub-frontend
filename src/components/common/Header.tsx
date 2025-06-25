import { checkLogin, getUserId } from "@/lib/token";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotificationDrawer from "../notification/NotificationDrawer";

const Header = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
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
    <header className="w-full h-[80px] bg-[#FFCC80] flex items-center justify-between px-[24px] shadow-md font-sans box-border overflow-x-hidden">
      <div className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt="logo"
          className="h-[60px] w-auto cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>
      <div className="flex items-center gap-[25px] pr-[25px]">
        <div ref={bellRef}>
          <img
            src="/bell.svg"
            alt="bell"
            className="w-[43px] h-[43px] cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <NotificationDrawer
              open={open}
              onClose={() => setOpen(false)}
              anchorRef={bellRef}
              userId={Number(getUserId()) || 0}
            />
          )}
        </div>
        {checkLogin() ? (
          <Link to="/mypage">
            <img
              src="/profile.svg"
              alt="profile"
              className="w-[43px] h-[43px] cursor-pointer"
            />
          </Link>
        ) : (
          <Link to="/login">
            <img
              src="/login.svg"
              alt="profile"
              className="w-[43px] h-[43px] cursor-pointer"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
