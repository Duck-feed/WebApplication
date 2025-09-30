import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth";
import { notificationReducer } from "@/features/notification";
import { postReducer } from "@/features/post";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
