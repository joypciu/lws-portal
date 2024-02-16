import { configureStore } from '@reduxjs/toolkit';
import assignmentMarkSlice from '../features/assignmentMarks/assignmentMarkSlice';
import adminAssignmentSlice from '../features/adminAssignments/adminAssignmentSlice';
import quizSlice from '../features/quizzes/quizSlice';
import { apiSlice } from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import quizMarkSlice from '../features/quizMarks/quizMarkSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    assignmentMark: assignmentMarkSlice,
    quizMark: quizMarkSlice,
    assignments: adminAssignmentSlice,
    quizzes: quizSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
