import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { loadDefaultUser, selectAuthInitialized } from "@/features/auth/slice";

export default function RootLayout() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(loadDefaultUser());
    }
  }, [dispatch, initialized]);

  return <Outlet />;
}
