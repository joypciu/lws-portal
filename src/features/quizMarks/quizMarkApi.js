import { apiSlice } from '../api/apiSlice';
import { addAllQuizMarks } from './quizMarkSlice';

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuizMarks: builder.query({
      query: () => ({
        url: '/quizMark',
        method: 'GET',
      }),
      providesTags: ['quizMarks'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            addAllQuizMarks({
              all: result.data,
            })
          );
        } catch (err) {}
      },
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: '/quizMark',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['quizMarks'],
    }),
    fetchSingleQuizMarkByStudentAndVideoId: builder.query({
      query: ({ userId, videoId }) => ({
        url: `/quizMark?student_id=${userId}&video_id=${videoId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFetchQuizMarksQuery,
  useAddQuizMarkMutation,
  useFetchSingleQuizMarkByStudentAndVideoIdQuery,
} = quizMarkApi;
