// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postslice';
import authReducer from '../features/auth/authSlice';
 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
