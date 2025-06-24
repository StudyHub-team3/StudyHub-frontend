// components/sections/UserProfileSection.tsx
import type { ApiResponse } from "@/types/userApi"
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";

interface UserProfileSectionProps {
    onEditProfileClick: () => void;
    onDeleteUserClick: () => void;
    userName?: string;
    userEmail?: string
    userPhoneNumber?: string;
    userJoinDate?: string;
}

export default function UserProfileSection({
    onEditProfileClick,
    onDeleteUserClick,
    userName = "null",
    userEmail = "null",
    userPhoneNumber = "null",
    userJoinDate = "null",
}: UserProfileSectionProps) {
    const navigate = useNavigate();

    const handleLogoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post<ApiResponse<null>>("/users/auth/logout");

            console.log('로그아웃 시도');

            if (response.data.code === "OK") {
                console.log("로그아웃 성공!");

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                navigate('/');
            } else {
                throw new Error('로그아웃에 실패했습니다.');
            }

        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="bg-[#FEF0E1] flex flex-col px-[30px] py-[20px] border rounded-md"> {/* flex-col 유지 */}
            {/* 프로필 이미지, 이름, 프로필 수정/로그아웃 버튼 섹션 */}
            <div className="flex items-center mb-[40px] px-[10px]">
                <img src="https://cdn-icons-png.flaticon.com/512/552/552721.png" alt="프로필" className="w-[48px] object-cover" />
                <span className="text-[26px] font-bold text-[#525252] ml-[20px]">{userName}</span>
                <div className="ml-auto flex gap-[30px]">
                    <div onClick={onEditProfileClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[20px]">
                            {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                        </svg>
                    </div>
                    <div onClick={handleLogoutSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[20px] fill-current text-[#e34949]">
                            {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 연락처 및 가입일 정보 섹션 */}
            <div className="text-[#525252] text-[20px] grid grid-cols-3 gap-x-[100px] text-center mb-[5px] px-[10px]">

                {/* Email */}
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[20px]">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                    </svg>
                    <span className="ml-[10px]">{userEmail}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[20px]">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    <span className="ml-[10px]">{userPhoneNumber}</span>
                </div>

                {/* Calendar */}
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[20px]">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256zm176 40c-13.3 0-24 10.7-24 24l0 48-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0 0 48c0 13.3 10.7 24 24 24s24-10.7 24-24l0-48 48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-48c0-13.3-10.7-24-24-24z" />
                    </svg>
                    <span className="ml-[10px]">{userJoinDate.substring(0, userJoinDate.indexOf('T'))}</span>
                </div>

            </div>

            {/* 회원 탈퇴 버튼 섹션 (새로운 줄에서 오른쪽 정렬) */}
            <div className="flex justify-end px-[10px]"> {/* flex와 justify-end를 추가하여 버튼을 오른쪽으로 보냅니다. */}
                <div onClick={onDeleteUserClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-[20px] fill-current text-[#e34949]">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M576 128c0-35.3-28.7-64-64-64L205.3 64c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7L512 448c35.3 0 64-28.7 64-64l0-256zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}