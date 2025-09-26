import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "@/features/post";
import { authReducer } from "@/features/auth";
import { notificationReducer } from "@/features/notification";

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
