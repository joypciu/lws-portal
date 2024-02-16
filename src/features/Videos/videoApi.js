// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { apiSlice } from '../api/apiSlice';

export const videoApi = apiSlice.injectEndpoints({
  //   reducerPath: 'adminVideoApi',
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: process.env.REACT_APP_API_URL,
  //   }),
  //   tagTypes: [],

  endpoints: (builder) => ({
    fetchVideos: builder.query({
      query: () => ({
        url: '/videos',
        method: 'GET',
      }),
      providesTags: ['videos'],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['videos'],
    }),
    deleteVideo: builder.mutation({
      invalidatesTags: ['videos'],
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
    }),
    getSingleVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'GET',
      }),
      providesTags: ['video'],
    }),
    editVideo: builder.mutation({
      queryFn: async (
        { id, updatedData },
        _queryApi,
        _extraOptions,
        fetchBaseQuery
      ) => {
        const updatedVideo = await fetchBaseQuery({
          url: `/videos/${id}`,
          method: 'PATCH',
          body: updatedData,
        });
        const assignmentExist = await fetchBaseQuery({
          url: `/assignments?video_id=${id}`,
          method: 'GET',
        });
        const quizExist = await fetchBaseQuery({
          url: `/quizzes?video_id=${id}`,
          method: 'GET',
        });

        if (assignmentExist.data.length > 0) {
          const updatedAssignment = {
            ...assignmentExist.data[0],
            video_title: updatedData.title,
          };
          const assignmentId = assignmentExist.data[0].id;

          await fetchBaseQuery({
            url: `/assignments/${assignmentId}`,
            method: 'PATCH',
            body: updatedAssignment,
          });
        }
        if (quizExist.data.length > 0) {
          for (let i = 0; i < quizExist.data.length; i++) {
            const updatedQuiz = {
              ...quizExist.data[i],
              video_title: updatedData.title,
            };
            const quizId = quizExist.data[i].id;
            await fetchBaseQuery({
              url: `/quizzes/${quizId}`,
              method: 'PATCH',
              body: updatedQuiz,
            });
          }
        }
        return updatedVideo;
      },
      invalidatesTags: ['videos', 'video', 'quizzes', 'assignments'],
    }),
  }),
});
export const {
  useFetchVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetSingleVideoQuery,
  useEditVideoMutation,
} = videoApi;
