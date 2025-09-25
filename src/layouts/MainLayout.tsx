import type { AppDispatch } from "@/app/store";
import Navbar from "@/components/layout/navbar/Navbar";
import { countUnseenNotificationThunk } from "@/features/notification/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(countUnseenNotificationThunk("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"));
  }, [dispatch]);

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}
