import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for posts slice
const initialState = {
  posts: [], 
  loading: false, 
  error: null, 
};

// Async thunk to fetch posts from an API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

// Slice definition for posts
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(post) {
        return { payload: { id: post.id, title: post.title, body: post.body } };
      },
    },
    updatePost(state, action) {
      const { id, title, body } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    deletePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedPosts = action.payload.map((post) => ({
          ...post, id: post.id.toString(),
        }));
        const existingIds = new Set(state.posts.map((post) => post.id));
        state.posts = [
          ...state.posts,
          ...fetchedPosts.filter((post) => !existingIds.has(post.id)),
        ];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
