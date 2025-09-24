import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countUnReadNotification, countUnseenNotification, getListNotification } from "./api";
import type { UserNotification } from "./types";

interface NotificationState {
  items: UserNotification[];
  countUnRead: number;
  countUnseen: number;
  loading: boolean;
}

const initialState: NotificationState = {
  items: [],
  countUnRead: 0,
  countUnseen: 0,
  loading: false,
};

export const getListNotificationThunk = createAsyncThunk(
  "notification/getList",
  async (data: { userId: string; params: object }) =>
    await getListNotification(data.userId, data.params),
);

export const countUnReadNotificationThunk = createAsyncThunk(
  "notification/countUnRead",
  async (userId: string) => await countUnReadNotification(userId),
);

export const countUnseenNotificationThunk = createAsyncThunk(
  "notification/countUnseen",
  async (userId: string) => await countUnseenNotification(userId),
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUnseenCount: (state, action) => {
      state.countUnseen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListNotificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(getListNotificationThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(countUnReadNotificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(countUnReadNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.countUnRead = action.payload.data.unreadCount;
      })
      .addCase(countUnReadNotificationThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(countUnseenNotificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(countUnseenNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.countUnseen = action.payload.data.unseenCount;
      })
      .addCase(countUnseenNotificationThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setUnseenCount } = notificationSlice.actions;
export default notificationSlice.reducer;
