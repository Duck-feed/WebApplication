import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { logout, loginUser, selectAuthUser, selectAuthLoading } from "../slice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const loading = useAppSelector(selectAuthLoading);

  return {
    user,
    loading,
    login: (e: string, p: string, r: boolean = false) =>
      dispatch(loginUser({ email: e, password: p, remember: r })),
    logout: () => dispatch(logout()),
  };
}
