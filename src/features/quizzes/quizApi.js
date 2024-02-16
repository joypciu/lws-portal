// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../api/apiSlice';
import { allQuizzes } from './quizSlice';

export const quizApi = apiSlice.injectEndpoints({
  //   reducerPath: 'adminVideoApi',
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: process.env.REACT_APP_API_URL,
  //   }),
  //   tagTypes: [],

  endpoints: (builder) => ({
    fetchQuizzes: builder.query({
      query: () => ({
        url: '/quizzes',
        method: 'GET',
      }),
      providesTags: ['quizzes'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            allQuizzes({
              all: result.data,
            })
          );
        } catch (err) {}
      },
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: '/quizzes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['quizzes'],
    }),
    deleteQuiz: builder.mutation({
      queryFn: async ({ id, video_id }, _, __, fetchBaseQuery) => {
        const quizMarkExist = await fetchBaseQuery({
          url: `/quizMark?video_id=${video_id}`,
          method: 'GET',
        });
        if (quizMarkExist.data?.length > 0) {
          for (let i = 0; i < quizMarkExist.data.length; i++) {
            await fetchBaseQuery({
              url: `/quizMark/${quizMarkExist.data[i].id}`,
              method: 'DELETE',
            });
          }
        }
        const deleteQuiz = fetchBaseQuery({
          url: `/quizzes/${id}`,
          method: 'DELETE',
        });
        return deleteQuiz;
      },
      invalidatesTags: ['quizzes', 'quizMarks'],
    }),
    getSingleQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'GET',
      }),
      providesTags: ['quiz'],
    }),
    editQuiz: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['quizzes', 'quiz'],
    }),
  }),
});
export const {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useEditQuizMutation,
  useFetchQuizzesQuery,
  useGetSingleQuizQuery,
} = quizApi;
