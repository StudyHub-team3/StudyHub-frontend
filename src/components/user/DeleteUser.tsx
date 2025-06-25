// pages/mypage/confirm-delete.tsx (또는 components/ConfirmDeleteUserModal.tsx)
import { useState } from "react";
import ModalWrapper from "../../layouts/ModalLayout"; // 경로에 맞게 수정
import type { ApiResponse } from "@/types/userApi";
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";

interface ConfirmDeleteUserProps {
  onModal: () => void;
}

export default function ConfirmDeleteUser({ onModal }: ConfirmDeleteUserProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const handleDeleteUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password === checkPassword) {
        console.log('회원 탈퇴가 진행됩니다.');

        const response = await api.post<ApiResponse<null>>("/users/auth/delete", {
          password
        });

        if (response.data.code === "OK") {
          console.log("회원 탈퇴 성공!");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          onModal(); // 모달 닫기

          navigate('/');
        } else {
          throw new Error("회원 탈퇴 실패")
        }

      } else {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalWrapper
      onModal={onModal}
      title="회원 탈퇴 확인"
      buttonText="탈퇴"
      onSubmit={handleDeleteUserSubmit}
    >
      <div className="mb-4">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
        />
      </div>
    </ModalWrapper>
  );
}