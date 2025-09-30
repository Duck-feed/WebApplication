import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/redux";
import type { AppDispatch } from "@/app/store";
import { selectAuthUser } from "@/features/auth/slice";
import { countUnseenNotificationThunk } from "../slice";

export const useNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, countUnRead } = useAppSelector((state) => state.notification);
  const userId = useAppSelector(selectAuthUser)?.id;

  useEffect(() => {
    if (!userId) return;
    dispatch(countUnseenNotificationThunk(userId));
  }, [dispatch, userId]);

  return {
    items,
    countUnRead,
  };
};
