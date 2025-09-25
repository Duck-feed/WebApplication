import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { loadDefaultUser, selectAuthInitialized, selectAuthLoading } from "@/features/auth/slice";
import { sampleUserId } from "@/features/notification";
import { useSignalR } from "@/features/notification/hooks/useSignalR";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const loading = useAppSelector(selectAuthLoading);
  useSignalR(sampleUserId);

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
