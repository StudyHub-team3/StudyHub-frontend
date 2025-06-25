export interface Notification {
  alarmId: number;
  userId: number;
  type: string;
  title: string;
  content: string;
  isRead: boolean;
  externalId: string;
  createdAt: string;
  updatedAt: string;
}
