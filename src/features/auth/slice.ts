// src/features/auth/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./api";
import type { User } from "./types";
import type { RootState } from "@/app/store";

export const loadDefaultUser = createAsyncThunk(
  "auth/loadDefaultUser",
  async () => {
    return await authApi.getUserById(1); // Giả sử tải user có id = 1
  }
);

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;   // ✅ thêm cờ này
}

const initialState: AuthState = {
  user: null,
  loading: false,
  initialized: false,     // ✅ mặc định chưa init
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDefaultUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadDefaultUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.loading = false;
          state.initialized = true;   // ✅ đã init xong
        }
      )
      .addCase(loadDefaultUser.rejected, (state) => {
        state.loading = false;
        state.initialized = true;     // ✅ cũng coi như init xong (dù fail)
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized; // ✅ thêm selector
