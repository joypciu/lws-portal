import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allQuizMarks: [],
  total: 0,
  pending: 0,
  mark_sent: 0,
};
const quizMarkSlice = createSlice({
  name: 'adminAssignmentMarkSlice',
  initialState,
  reducers: {
    addAllQuizMarks: (state, action) => {
      state.allQuizMarks = action.payload.all;
    },
  },
});

export const { addAllQuizMarks } = quizMarkSlice.actions;
export default quizMarkSlice.reducer;
