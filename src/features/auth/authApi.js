import { apiSlice } from '../api/apiSlice';
import {
  userLoggedIn,
  adminLoggedIn,
  userLoggedOut,
  adminLoggedOut,
} from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          localStorage.setItem('adminAuth', JSON.stringify({}));

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch(adminLoggedOut());
        } catch (err) {
          // do nothing
        }
      },
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            'adminAuth',
            JSON.stringify({
              adminAccessToken: result.data.accessToken,
              admin: result.data.user,
            })
          );
          localStorage.setItem('auth', JSON.stringify({}));

          dispatch(
            adminLoggedIn({
              adminAccessToken: result.data.accessToken,
              admin: result.data.user,
            })
          );
          dispatch(userLoggedOut());
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAdminLoginMutation } =
  authApi;
