import apiClient from "@/lib/apiClient";

export const getListNotification = async (userId: string, params: object) =>
  await apiClient.get(`api/notifications/user/${userId}`, { params });

export const countUnReadNotification = async (userId: string) =>
  await apiClient.get(`api/notifications/user/${userId}/unread-count`);

export const countUnseenNotification = async (userId: string) =>
  await apiClient.get(`api/notifications/user/${userId}/unseen-count`);

export const markAsSeenMany = async (ids: string[]) =>
  await apiClient.put("api/notifications/seen", { ids });
