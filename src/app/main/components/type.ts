export interface Notification {
  notificationId: number;
  targetId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  notificationType: string;
}

export interface InspectionDate {
  id: number;
  nextInspectionDate: string;
}
