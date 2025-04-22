import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // User data (e.g., token, profile)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
