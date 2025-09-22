import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { User } from "./types";
import { authApi } from "./api";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  initialized: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  initialized: false,
  error: null,
};

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password, remember = false }: { email: string; password: string; remember?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const { accessToken, refreshToken } = await authApi.login(email, password);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode<JwtPayload>(accessToken);
      const user: User = {
        id: decoded.userId,
        email: decoded.email,
        roleId: decoded.role,
      };
      return { accessToken, refreshToken, user };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loadDefaultUser = createAsyncThunk("auth/loadDefaultUser", async () => {
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token");

  const decoded = jwtDecode<JwtPayload>(token);

  const user: User = {
    id: decoded.userId,
    email: decoded.email,
    roleId: decoded.role,
  };

  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.initialized = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.loading = false;
        state.initialized = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = (action.payload as string) || action.error.message || null;
      })

      .addCase(loadDefaultUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadDefaultUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.initialized = true;
        state.error = null;
      })
      .addCase(loadDefaultUser.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectAuthError = (state: RootState) => state.auth.error;
