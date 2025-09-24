export interface UserNotification {
  id: string;
  postId: string;
  userId: string;
  notificationType: string;
  count: number;
  title: string;
  message: string;
  type: string;
  status: number;
  createdAt?: string;
  ProcessedAt?: string;
  isSeen: boolean;
  seenAt?: string;
  isRead: boolean;
  readAt?: string;

  actors: NotificationActor[];
}

export interface NotificationActor {
  userId: string;
  fullName: string;
  avatarUrl: string;
  action: string;
  interactedAt: string;
}
