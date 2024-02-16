import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
  admin: undefined,
  adminAccessToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.adminAccessToken = undefined;
      state.admin = undefined;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.setItem('auth', JSON.stringify({}));
    },
    adminLoggedIn: (state, action) => {
      state.adminAccessToken = action.payload.adminAccessToken;
      state.admin = action.payload.admin;
      state.accessToken = undefined;
      state.user = undefined;
    },
    adminLoggedOut: (state) => {
      state.adminAccessToken = undefined;
      state.admin = undefined;
      localStorage.setItem('adminAuth', JSON.stringify({}));
    },
  },
});

export const { userLoggedIn, userLoggedOut, adminLoggedIn, adminLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
