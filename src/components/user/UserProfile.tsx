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
            const response = await api.post<ApiResponse<null>>("/api/users/auth/logout");

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
        <div className="bg-[#FEF0E1] flex flex-col px-[30px] py-[20px] border rounded-md">
            <div className="flex items-center mb-[40px] px-[10px]">
                <img src="./profile.svg" alt="프로필" className="w-[48px] object-cover" />
                <span className="text-[26px] font-bold text-[#525252] ml-[20px]">{userName}</span>
                <div className="ml-auto flex gap-[30px]">
                    <img src="./edit.svg" className="w-[20px] cursor-pointer" onClick={onEditProfileClick} />
                    <img src="./logout.svg" className="w-[20px] cursor-pointer" onClick={handleLogoutSubmit} />
                </div>
            </div>

            <div className="text-[#525252] text-[20px] grid grid-cols-3 gap-x-[100px] text-center mb-[5px] px-[10px]">

                {/* Email */}
                <div className="flex items-center justify-center">
                <img src="./email.svg" className="w-[20px]" />
                    <span className="ml-[10px]">{userEmail}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center">
                <img src="./phone.svg" className="w-[20px]" />
                    <span className="ml-[10px]">{userPhoneNumber}</span>
                </div>

                {/* Calendar */}
                <div className="flex items-center justify-center">
                <img src="./created_at.svg" className="w-[20px]" />
                    <span className="ml-[10px]">{userJoinDate.substring(0, userJoinDate.indexOf('T'))}</span>
                </div>

            </div>

            <div className="flex justify-end px-[10px]"> 
                <img src="./delete.svg" className="w-[20px] fill-current text-[#e34949] cursor-pointer" onClick={onDeleteUserClick} />
            </div>
        </div>
    );
}