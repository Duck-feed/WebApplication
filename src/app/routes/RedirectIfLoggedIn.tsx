import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks/redux";
import { selectAuthLoading, selectAuthUser } from "@/features/auth/slice";

export default function RedirectIfLoggedIn() {
  const user = useAppSelector(selectAuthUser);
  const loading = useAppSelector(selectAuthLoading);

  if (loading) return null;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
