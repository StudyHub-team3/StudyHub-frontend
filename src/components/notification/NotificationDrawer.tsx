import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Notification } from "../../types/notification";
import { getNotifications } from "../../api/notificationMock";

interface Props {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export default function NotificationDrawer({
  open,
  onClose,
  anchorRef,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [coords, setCoords] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8, // 종 아이콘 아래
        right: window.innerWidth - rect.right,
      });
    }
  }, [open, anchorRef]);

  useEffect(() => {
    if (open) {
      getNotifications()
        .then((res) => setNotifications(res.data))
        .catch(console.error);
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="w-[420px] h-[740px] bg-white rounded-2xl shadow-xl border overflow-hidden flex flex-col z-[999]"
      style={{
        position: "fixed",
        top: coords.top,
        right: coords.right,
      }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">알림</h2>
        <button onClick={onClose} className="text-gray-500 text-sm">
          닫기 ✕
        </button>
      </div>
      {/* 알림 내용 생략 */}
      <div className="p-4 text-sm text-gray-500">알림이 여기에 나옵니다.</div>
    </div>,
    document.body
  );
}
