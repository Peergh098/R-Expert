import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base RTK Query API
 * All endpoint slices inject into this single instance so they share
 * one cache, one middleware, and one reducerPath.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('admin_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Submission', 'SubmissionStats', 'Contact', 'Auth'],
  endpoints: () => ({}),
});
