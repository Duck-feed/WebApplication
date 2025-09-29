import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import Navbar from "@/components/layout/navbar/Navbar";
import { selectAuthUser } from "@/features/auth/slice";
import { countUnseenNotificationThunk } from "@/features/notification/slice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectAuthUser)?.id;

  useEffect(() => {
    if (!userId) return;
    dispatch(countUnseenNotificationThunk(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}
