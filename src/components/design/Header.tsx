import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[70px] #FFCC80 flex items-center justify-between px-[24px] shadow-md font-sans box-border overflow-x-hidden max-w-full">
      <div className="text-[24px] font-bold text-text-main">StudyHub</div>
      <nav className="flex gap-[20px] items-center text-[16px] text-text-main">
        <a href="/studies">스터디 목록</a>
        <a href="/mypage">마이페이지</a>
        <button className="bg-button text-white px-4 py-1 rounded">로그인</button>
      </nav>
    </header>
  );
};

export default Header;