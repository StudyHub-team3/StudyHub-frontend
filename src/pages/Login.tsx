// pages/login.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout"; // 새로 생성한 컴포넌트 경로 확인
import api from "@/lib/axios";
import type { ApiResponse, TokenData } from "@/types/userApi";
import { tokenRefresh, validateToken } from "@/lib/token";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 중일 시 접속 불가
  useEffect(() => {
    if (validateToken()) {
      navigate(-1);
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도');

    try {
      // 로그인 API 호출 시 응답 데이터의 타입을 명시합니다.
      const response = await api.post<ApiResponse<TokenData>>("/api/users/auth/login", {
        email,
        password,
      });

      if (response.data.code === "OK" && response.data.data?.access?.token) {
        console.log("로그인 성공! Access Token");

        tokenRefresh(
          response.data.data.access.token,
          response.data.data.refresh.token
        )

        navigate('/');
      } else {
        throw new Error('로그인에 실패했습니다.');
      }

    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthLayout
      title="Login"
      buttonText="로그인"
      onSubmit={handleSubmit}
      bottomLink={<Link to='/signup' className="inline-block text-[14px] text-[#525252] hover:underline">회원가입</Link>}
    >
      <div>
        <input
          type="email"
          className="w-full h-[40px] p-[10px] mb-[18px] bg-[#FFFDFD] border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="studyhub@studyhub.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          className="w-full h-[40px] p-[10px] mb-[18px] bg-[#FFFDFD] border rounded-md focus:outline-none focus:ring-3 focus:ring-orange-400"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </AuthLayout>
  );
}