import type { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countUnseenNotificationThunk } from "../slice";

export const useNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, countUnRead } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    dispatch(countUnseenNotificationThunk("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"));
  }, [dispatch]);

  return {
    items,
    countUnRead,
  };
};
