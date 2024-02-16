import { apiSlice } from '../api/apiSlice';
import { assignments } from './assignmentMarkSlice';
export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAssignmentMarks: builder.query({
      query: () => ({
        url: '/assignmentMark',
        method: 'GET',
      }),
      providesTags: ['assignmentMarks'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            assignments({
              all: result.data,
            })
          );
        } catch (err) {}
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['assignmentMarks'],
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: '/assignmentMark',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['assignmentMarks'],
    }),
   
  }),
});

export const {
  useFetchAssignmentMarksQuery,
  useEditAssignmentMarkMutation,
  useAddAssignmentMarkMutation,
  
} = assignmentMarkApi;
