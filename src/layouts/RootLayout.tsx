import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import {
  loadDefaultUser,
  selectAuthInitialized,
  selectAuthLoading,
  selectAuthUser,
} from "@/features/auth/slice";
import { useSignalR } from "@/features/notification/hooks/useSignalR";

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const loading = useAppSelector(selectAuthLoading);
  const userId = useAppSelector(selectAuthUser)?.id;
  useSignalR(userId ?? "");

  useEffect(() => {
    if (!initialized) {
      dispatch(loadDefaultUser());
    }
  }, [dispatch, initialized]);

  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return <Outlet />;
}
