import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: [],
};
const quizSlice = createSlice({
  name: 'adminAssignmentMarkSlice',
  initialState,
  reducers: {
    allQuizzes: (state, action) => {
      state.quizzes = action.payload.all;
    },
  },
});

export const { allQuizzes } = quizSlice.actions;
export default quizSlice.reducer;
