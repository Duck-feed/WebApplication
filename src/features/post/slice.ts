import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPersonalNewsfeed } from "./api";
import type { NewsfeedQuery, NewsfeedResponse, Post } from "./types";

interface PostState {
  items: Post[];
  hasMore: boolean;
  next: string | null;
  loading: boolean;
}

const initialState: PostState = {
  items: [],
  hasMore: false,
  next: null,
  loading: false,
};

export const fetchPosts = createAsyncThunk<
  NewsfeedResponse,
  { userId: string; params?: NewsfeedQuery }
>("post/fetchPosts", async ({ userId, params }) => {
  return await getPersonalNewsfeed(userId, { cursor: "", pageSize: params?.pageSize });
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.posts;
        state.hasMore = action.payload.hasMore;
        state.next = action.payload.cursor;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
