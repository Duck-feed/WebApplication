import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "./types";
import { getPosts } from "./api";

interface PostState {
  items: Post[];
  loading: boolean;
}

const initialState: PostState = {
  items: [],
  loading: false,
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  return await getPosts();
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
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
