// pages/mypage/edit.tsx (또는 components/EditProfileModal.tsx)
import { useEffect, useState } from "react";
import ModalWrapper from "../../layouts/ModalLayout";
import type { ApiResponse, UserInfoData } from "@/types/userApi"
import api from "@/lib/axios";

interface EditProfileProps {
  onModal: () => void;
  onUpdateUserInfo: (updatedInfo: UserInfoData) => void;
  initialUserInfo?: UserInfoData | null;
}

export default function EditProfile({ onModal, onUpdateUserInfo, initialUserInfo }: EditProfileProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialUserInfo) {
      setName(initialUserInfo.name);
      setPhoneNumber(initialUserInfo.phoneNumber);
    }
  }, [initialUserInfo]);

  const handleEditProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('회원 정보 수정 시도');
    
    try {
      if (name == null || phoneNumber == null) {
        throw new Error('공백은 입력할 수 없습니다.');
      } 
      if (password == null) {
        throw new Error('비밀번호를 입력하세요.');
      }

      const response = await api.put<ApiResponse<UserInfoData>>('/api/users/my/info', {
        name,
        phoneNumber,
        password
      });

      if (response.data.code === "OK") {

        if (response.data.data) {
          onUpdateUserInfo(response.data.data);
        }

        onModal(); // 모달 닫기

      } else {
        throw new Error('회원 정보 수정 실패')
      }
    } catch (error) {
      alert(error);
    }

  };

  return (
    <ModalWrapper
      onModal={onModal}
      title="회원 정보 수정"
      buttonText="수정"
      onSubmit={handleEditProfileSubmit}
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-[40px] p-[10px] mb-[18px] bg-[#FFFDFD] border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          placeholder="전화번호"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full h-[40px] p-[10px] mb-[18px] bg-[#FFFDFD] border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[40px] p-[10px] mb-[18px] bg-[#FFFDFD] border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </ModalWrapper>
  );
}