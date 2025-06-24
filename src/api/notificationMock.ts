import type { Notification } from "../types/notification";

export const getNotifications = async (): Promise<{ data: Notification[] }> => {
  return {
    data: [
      {
        id: 1,
        title: "📣 새로운 공지사항",
        content: "스터디 일정이 변경되었습니다. 확인해주세요.",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "✅ 출석 체크 완료",
        content: "오늘도 열공하셨네요! 출석 포인트가 적립되었습니다.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 3,
        title: "🔥 인기 게시물 알림",
        content: "당신이 작성한 게시물이 실시간 인기글에 등록됐어요!",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ],
  };
};
