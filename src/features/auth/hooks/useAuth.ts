import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { logout, selectAuthUser, selectAuthLoading } from "../slice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const loading = useAppSelector(selectAuthLoading);

  return {
    user,
    loading,
    logout: () => dispatch(logout()),
  };
}
