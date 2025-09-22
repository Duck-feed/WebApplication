import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { loadDefaultUser, selectAuthInitialized, selectAuthLoading } from "@/features/auth/slice";

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const loading = useAppSelector(selectAuthLoading);

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
