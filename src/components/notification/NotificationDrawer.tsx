import { useEffect, useRef, useState } from "react";
import type { Notification } from "../../types/notification";
import {
  getNotifications,
  markAllNotificationsAsRead,
} from "../../api/notification";

interface Props {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  userId: number;
}

export default function NotificationDrawer({
  open,
  onClose,
  anchorRef,
  userId,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  // 위치 계산
  useEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [open, anchorRef]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  // 알림 불러오기 + 전체 읽음 처리
  useEffect(() => {
    if (open) {
      getNotifications(userId)
        .then((fetched) => {
          setNotifications(fetched);

          const unreadIds = fetched
            .filter((n) => !n.isRead)
            .map((n) => n.alarmId);
          if (unreadIds.length > 0) {
            markAllNotificationsAsRead(unreadIds)
              .then(() => {
                setNotifications((prev) =>
                  prev.map((n) =>
                    unreadIds.includes(n.alarmId) ? { ...n, isRead: true } : n
                  )
                );
              })
              .catch((err) => console.error("전체 읽음 처리 실패:", err));
          }
        })
        .catch((err) => console.error("알림 불러오기 실패:", err));
    }
  }, [open]);

  if (!open) return null;

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  return (
    <div
      ref={drawerRef}
      className="fixed z-50 w-[420px] h-[740px] bg-white shadow-xl rounded-2xl border flex flex-col"
      style={{
        top: coords.top,
        right: coords.right,
      }}
    >
      <div className="flex justify-between items-center border-b px-[16px] py-[12px] mb-[16px]">
        <div className="text-lg font-bold">알림</div>
        <button
          onClick={onClose}
          className="text-gray-800 text-sm px-[8px] py-[4px]"
        >
          닫기 ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-[16px] py-[20px] bg-gray-50 space-y-[16px]">
        {notifications.length === 0 ? (
          <div className="text-sm text-gray-500 text-center">
            알림이 없습니다
          </div>
        ) : (
          <>
            {unreadNotifications.map((n) => (
              <div
                key={n.alarmId}
                className="p-[16px] rounded-xl shadow-sm border border-blue-400 bg-white cursor-default"
              >
                <h3 className="font-semibold text-[15px] mb-[4px]">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-700">{n.content}</p>
                <span className="text-xs text-gray-400 block mt-[4px]">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            ))}

            {readNotifications.length > 0 && unreadNotifications.length > 0 && (
              <div className="text-xs text-gray-400 pt-[12px] border-t border-gray-300">
                이전 알림
              </div>
            )}

            {readNotifications.map((n) => (
              <div
                key={n.alarmId}
                className="p-[16px] rounded-xl shadow-sm cursor-default"
                style={{ backgroundColor: "#ffdf94" }}
              >
                <h3 className="font-semibold text-[15px] mb-[4px]">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-700">{n.content}</p>
                <span className="text-xs text-gray-400 block mt-[4px]">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
