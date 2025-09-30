import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { normalizeError } from "@/lib/utils";
import { authApi } from "./api";
import type { User } from "./types";

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

interface LoginUserArgs {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginUserResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface LoadDefaultUserResult {
  user: User;
  accessToken: string;
  refreshToken: string | null;
}

const clearStoredTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, remember = false }: LoginUserArgs, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = await authApi.login(email, password);

      clearStoredTokens();
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);

      const user = await authApi.getMe();
      return { accessToken, refreshToken, user } as LoginUserResult;
    } catch (err: unknown) {
      return rejectWithValue(normalizeError(err));
    }
  },
);

export const loadDefaultUser = createAsyncThunk(
  "auth/loadDefaultUser",
  async (_, { rejectWithValue }) => {
    const accessToken =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    const refreshToken =
      localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

    if (!accessToken) return rejectWithValue("No token");

    try {
      const user = await authApi.getMe();
      return { user, accessToken, refreshToken: refreshToken ?? null } as LoadDefaultUserResult;
    } catch (err: unknown) {
      return rejectWithValue(normalizeError(err));
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
  } catch (err: unknown) {
    return rejectWithValue(normalizeError(err));
  }
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
      clearStoredTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.initialized = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = (action.payload as string) || action.error.message || null;
      })

      // loadDefaultUser
      .addCase(loadDefaultUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadDefaultUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loading = false;
        state.initialized = true;
        state.error = null;
      })
      .addCase(loadDefaultUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        state.initialized = true;
        state.error = null;
        clearStoredTokens();
      })

      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.initialized = false;
        state.error = null;
        state.loading = false;
        clearStoredTokens();
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.initialized = false;
        state.error = null;
        state.loading = false;
        clearStoredTokens();
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectAuthError = (state: RootState) => state.auth.error;
