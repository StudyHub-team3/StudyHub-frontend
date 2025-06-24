// pages/signup.tsx
import { useEffect, useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import api from "@/lib/axios";
import type { ApiResponse } from "@/types/userApi"
import { useNavigate } from "react-router-dom";
import { validateToken } from "@/lib/token";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // 로그인 중일 시 접속 불가
  useEffect(() => {
    if (validateToken()) {
      navigate(-1);
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    console.log('회원가입 시도');

    try {

      const response = await api.post<ApiResponse<null>>("/users/auth/register", {
        email,
        name,
        phoneNumber,
        password
      });

      // API 응답 로깅
      console.log('응답 성공:', response.data);

      if (response.data.code === "OK" ) {
        console.log("회원가입 성공!");

        navigate('/');
      } else {
        throw new Error('회원가입에 실패했습니다.');
      }

    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      buttonText="회원가입"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="email"
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="studyhub@studyhub.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          title="010-1234-5678"
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+\-]).{8,}"
          title="소문자, 대문자, 숫자, 특수문자가 포함된 8자리 이상의 비밀번호"
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+\-]).{8,}"
          title="소문자, 대문자, 숫자, 특수문자가 포함된 8자리 이상의 비밀번호"
          className="w-full h-[40px] p-[10px] mb-[18px] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
          placeholder="비밀번호 확인" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {confirmPassword != '' && password !== confirmPassword && 
        <p className="text-[#e34949] mb-[18px]">
          비밀번호가 일치하지 않습니다.
        </p>
      }
    </AuthLayout>
  );
}

// qW1#eR2$

