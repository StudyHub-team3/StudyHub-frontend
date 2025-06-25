import { checkLogin } from "@/lib/token";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-[80px] bg-[#FFCC80] flex items-center justify-between px-[24px] shadow-md font-sans box-border overflow-x-hidden">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="h-[60px] w-auto" />
      </div>
      <div className="flex items-center gap-[25px] pr-[25px]">
        <img src="/bell.svg" alt="bell" className="w-[43px] h-[43px]" />

        {
          checkLogin() ? 
            <Link to="/mypage">
              <img src="/profile.svg" alt="profile" className="w-[43px] h-[43px] cursor-pointer" />
            </Link>
            :
            <Link to="/login">
              <img src="/login.svg" alt="profile" className="w-[43px] h-[43px] cursor-pointer" />
            </Link>
        }
      </div>
    </header>
  );
};

export default Header;