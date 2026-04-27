import { baseApi } from './baseApi';
import type { Submission, SubmissionStatus, DashboardStats } from '../types';

// ── Request / Response shapes ──────────────────────────────────────────────

export interface GetSubmissionsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface GetSubmissionsResponse {
  submissions: Submission[];
  pagination: { total: number; page: number; pages: number };
}

export interface UpdateStatusRequest {
  id: string;
  status?: SubmissionStatus;
  adminNotes?: string;
  estimatedPrice?: number;
  replyMessage?: string;
}

// ── Injected endpoints ─────────────────────────────────────────────────────

export const submissionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /** Public — create a new submission (multipart/form-data) */
    createSubmission: builder.mutation<{ message: string; submissionId: string }, FormData>({
      query: (formData) => ({
        url: '/submissions',
        method: 'POST',
        body: formData,
        // Do NOT set Content-Type; browser adds it with the correct boundary
        formData: true,
      }),
    }),

    /** Admin — paginated list with optional status / search filters */
    getSubmissions: builder.query<GetSubmissionsResponse, GetSubmissionsParams>({
      query: ({ page = 1, limit = 15, status, search } = {}) => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (status) params.append('status', status);
        if (search) params.append('search', search);
        return `/submissions?${params}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.submissions.map(({ _id }) => ({ type: 'Submission' as const, id: _id })),
              { type: 'Submission', id: 'LIST' },
            ]
          : [{ type: 'Submission', id: 'LIST' }],
    }),

    /** Admin — dashboard stats + 5 most recent */
    getSubmissionStats: builder.query<DashboardStats, void>({
      query: () => '/submissions/stats',
      providesTags: ['SubmissionStats'],
    }),

    /** Admin — single submission by ID */
    getSubmissionById: builder.query<Submission, string>({
      query: (id) => `/submissions/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Submission', id }],
    }),

    /** Admin — update status / notes / price / send email reply */
    updateSubmissionStatus: builder.mutation<{ message: string; submission: Submission }, UpdateStatusRequest>({
      query: ({ id, ...body }) => ({
        url: `/submissions/${id}/status`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: 'Submission', id },
        { type: 'Submission', id: 'LIST' },
        'SubmissionStats',
      ],
    }),

    /** Admin — delete uploaded file, keep all other submission data */
    deleteSubmissionFile: builder.mutation<{ message: string; submission: Submission }, string>({
      query: (id) => ({
        url: `/submissions/${id}/file`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: 'Submission', id },
        { type: 'Submission', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateSubmissionMutation,
  useGetSubmissionsQuery,
  useGetSubmissionStatsQuery,
  useGetSubmissionByIdQuery,
  useUpdateSubmissionStatusMutation,
  useDeleteSubmissionFileMutation,
} = submissionsApi;
