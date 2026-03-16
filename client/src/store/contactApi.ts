import { baseApi } from './baseApi';
import type { ContactMessage } from '../types';

interface CreateContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface GetContactsResponse {
  contacts: ContactMessage[];
  pagination: { total: number; page: number; pages: number };
}

interface ReplyRequest {
  id: string;
  replyMessage: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /** Public — submit contact form */
    createContact: builder.mutation<{ message: string }, CreateContactRequest>({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
    }),

    /** Admin — list all contact messages */
    getContacts: builder.query<GetContactsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 } = {}) =>
        `/contact?page=${page}&limit=${limit}`,
      providesTags: ['Contact'],
    }),

    /** Admin — reply to a contact message */
    replyToContact: builder.mutation<{ message: string }, ReplyRequest>({
      query: ({ id, replyMessage }) => ({
        url: `/contact/${id}/reply`,
        method: 'PUT',
        body: { replyMessage },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useReplyToContactMutation,
} = contactApi;
