// pages/mypage/index.tsx
// 마이페이지 메인 화면
import Header from "@/components/common/Header"; // Header 컴포넌트 경로 확인
import UserProfileSection from "../../components/user/UserProfile"; // 새로 생성한 컴포넌트
import MyActivitiesSection from "../../components/user/MyActivities"; // 새로 생성한 컴포넌트
import { useCallback, useEffect, useState } from "react";
import EditProfile from "../../components/user/EditProfile"; // EditProfile 모달 경로 확인
import ConfirmDeleteUser from "../../components/user/DeleteUser"; // ConfirmDeleteUser 모달 경로 확인
import type { ApiResponse, UserInfoData } from "@/types/userApi";
import api from "@/lib/axios";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfoData | null>();

  // 모달 상태 관리
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState<boolean>(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] =
    useState<boolean>(false);

  const toggleEditProfileModal = useCallback(
    () => setIsEditProfileModalOpen((prev) => !prev),
    []
  );
  const toggleDeleteUserModal = useCallback(
    () => setIsDeleteUserModalOpen((prev) => !prev),
    []
  );

  const getMyInfo = async () => {
    console.log("사용자 정보 조회 시도");

    try {
      const response = await api.get<ApiResponse<UserInfoData>>(
        "/users/my/info"
      );

      if (response.data.code === "OK") {
        console.log("사용자 정보 조회 성공!");
        setUserInfo(response.data.data);
      } else {
        throw new Error("사용자 정보 조회에 실패했습니다.");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      {/* 모달 렌더링 */}
      {isEditProfileModalOpen && (
        <EditProfile
          onModal={toggleEditProfileModal}
          onUpdateUserInfo={setUserInfo}
          initialUserInfo={userInfo}
        />
      )}
      {isDeleteUserModalOpen && (
        <ConfirmDeleteUser onModal={toggleDeleteUserModal} />
      )}

      {/* 헤더 컴포넌트 */}
      <Header />

      <div className="bg-yellow-50 rounded-lg shadow-lg p-6 max-w-2xl mx-[50px] mt-[50px]">
        {/* 사용자 프로필 섹션 */}
        <UserProfileSection
          onEditProfileClick={toggleEditProfileModal} // 수정 버튼 클릭 시 모달 열기
          onDeleteUserClick={toggleDeleteUserModal} // 회원 탈퇴 버튼 클릭 시 모달 열기
          userName={userInfo?.name}
          userEmail={userInfo?.email}
          userPhoneNumber={userInfo?.phoneNumber}
          userJoinDate={userInfo?.createdAt}
        />

        {/* 나의 활동 목록 섹션 */}
        <MyActivitiesSection />
      </div>
    </div>
  );
}
