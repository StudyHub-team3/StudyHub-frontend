// components/layouts/AuthLayout.tsx
import Header from "@/components/common/Header";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;       // 폼의 제목 (Login, Sign Up 등)
  children: ReactNode; // 폼 필드와 버튼 등이 들어갈 내용
  onSubmit: (e: React.FormEvent) => void; // 폼 제출 핸들러
  buttonText: string;  // 제출 버튼 텍스트
  bottomLink?: ReactNode; // 하단에 올 링크 (옵션)
}

export default function AuthLayout({
  title,
  children,
  onSubmit,
  buttonText,
  bottomLink,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full max-w-screen overflow-x-hidden flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className={`w-full max-w-[400px] text-[#525252] bg-[#FEF0E1] rounded-[20px] px-[40px] py-[40px]`}>
          <h2 className="text-[26px] font-bold text-gray-800 mb-[28px] text-center">{title}</h2>
          <form onSubmit={onSubmit}>
            {children} {/* 여기에 입력 필드들이 들어갑니다 */}
            <button
              type="submit"
              className="w-full bg-[#FFCC80] hover:bg-[#FDBA74] text-[#FFFDFD] font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
            >
              {buttonText}
            </button>
          </form>
          {bottomLink && (
            <div className="text-center mt-[24px]">
              {bottomLink}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}