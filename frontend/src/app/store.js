// src/app/store.j
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postslice'; 
import authReducer from '../features/auth/authSlice'; 

// Create and export the store with auth and posts reducers
export const store = configureStore({
  reducer: {
    auth: authReducer, // Auth state
    posts: postsReducer, // Posts state
  },
});
