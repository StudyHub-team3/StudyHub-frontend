// components/ModalLayout.tsx
import type { ReactNode } from "react";

interface ModalLayoutProps {
  onModal: () => void; // 모달 외부 클릭 시 닫는 함수
  title: string;       // 모달 제목
  children: ReactNode; // 모달 내용 (폼 등)
  buttonText: string;  // 제출 버튼 텍스트
  onSubmit: (e: React.FormEvent) => void; // 폼 제출 핸들러
}

export default function ModalLayout({ onModal, title, children, buttonText, onSubmit }: ModalLayoutProps) {
  return (
    <div className="fixed w-full h-full bg-[#000000BB] bg-opacity-50 flex justify-center items-center z-50 p-[100px] text-[#525252]" onClick={onModal}>
      <div className="bg-[#FEF0E1] rounded-lg shadow-xl p-8 w-[400px] px-[50px] py-[36px]" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-800 mb-[30px] text-center">{title}</h2>
        <form onSubmit={onSubmit}>
          {children}
          <button type="submit" className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 focus:outline-none focus:ring focus:ring-amber-300 active:bg-amber-700">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}