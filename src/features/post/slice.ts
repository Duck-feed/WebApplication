import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { NewsfeedPagination, NewsfeedQuery, NewsfeedResponse, Post } from "./types";
import { getPersonalNewsfeed } from "./api";

interface PostState {
  items: Post[];
  pagination: NewsfeedPagination | null;
  loading: boolean;
}

const initialState: PostState = {
  items: [],
  pagination: null,
  loading: false,
};

export const fetchPosts = createAsyncThunk<NewsfeedResponse, { userId: string; params?: NewsfeedQuery }>(
  "post/fetchPosts",
  async ({ userId, params }) => {
    return await getPersonalNewsfeed(userId, params);
  },
);

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
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
