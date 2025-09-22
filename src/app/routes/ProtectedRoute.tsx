import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks/redux";
import { selectAuthUser } from "@/features/auth/slice";

export default function ProtectedRoute() {
  const user = useAppSelector(selectAuthUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
