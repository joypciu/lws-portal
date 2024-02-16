// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../api/apiSlice';
import { getAllAssignments } from './adminAssignmentSlice';

export const adminAssignemntApi = apiSlice.injectEndpoints({
  //   reducerPath: 'adminVideoApi',
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: process.env.REACT_APP_API_URL,
  //   }),
  //   tagTypes: [],

  endpoints: (builder) => ({
    fetchAssignments: builder.query({
      query: () => ({
        url: '/assignments',
        method: 'GET',
      }),
      providesTags: ['assignments'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            getAllAssignments({
              all: result.data,
            })
          );
        } catch (err) {}
      },
    }),

    addAssignment: builder.mutation({
      query: (data) => ({
        url: '/assignments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['assignments'],
    }),
    deleteAssignment: builder.mutation({
      queryFn: async (id, _, __, fetchBaseQuery) => {
        const assignmentMarkExist = await fetchBaseQuery({
          url: `/assignmentMark?assignment_id=${id}`,
          method: 'GET',
        });
        if (assignmentMarkExist.data?.length > 0) {
          for (let i = 0; i < assignmentMarkExist.data.length; i++) {
            await fetchBaseQuery({
              url: `/assignmentMark/${assignmentMarkExist.data[i].id}`,
              method: 'DELETE',
            });
          }
        }
        const deleteAssignment = await fetchBaseQuery({
          url: `/assignments/${id}`,
          method: 'DELETE',
        });

        return deleteAssignment;
      },
      invalidatesTags: ['assignments', 'assignmentMarks'],
    }),
    getSingleAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: 'GET',
      }),
      providesTags: ['assignment'],
    }),
    editAssignment: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['assignments', 'assignment'],
    }),
    fetchAssignmentByVideoId: builder.query({
      query: (id) => ({
        url: `/assignments?video_id=${id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useEditAssignmentMutation,
  useFetchAssignmentsQuery,
  useGetSingleAssignmentQuery,
  useFetchAssignmentByVideoIdQuery,
} = adminAssignemntApi;
