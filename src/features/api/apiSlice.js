import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { adminLoggedOut, userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    const adminToken = getState()?.auth?.adminAccessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (adminToken) {
      headers.set('Authorization', `Bearer ${adminToken}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      api.dispatch(adminLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
