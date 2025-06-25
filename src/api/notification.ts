import api from "../lib/axios";
import type { Notification } from "../types/notification";

// 백엔드 응답이 ApiResponseDto 구조일 경우
interface ApiResponse<T> {
  data: T;
}

export async function getNotifications(
  userId: number
): Promise<Notification[]> {
  const response = await api.get<ApiResponse<Notification[]>>(
    `/notifications?userId=${userId}`
  );
  return response.data.data;
}

export const markAllNotificationsAsRead = async (
  ids: number[]
): Promise<void> => {
  await api.put<ApiResponse<null>>("/backend/notifications/read-all", ids);
};
