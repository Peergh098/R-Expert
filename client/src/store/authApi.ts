import { baseApi } from './baseApi';
import type { AdminUser } from '../types';

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  user: AdminUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Auth'],
    }),

    getMe: builder.query<{ user: AdminUser }, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
