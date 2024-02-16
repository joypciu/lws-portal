import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allAssignments: [],
  total: 0,
  pending: 0,
  mark_sent: 0,
  total_marks: 0
};
const assignmentMarkSlice = createSlice({
  name: 'adminAssignmentMarkSlice',
  initialState,
  reducers: {
    assignments: (state, action) => {
      state.allAssignments = action.payload.all;
      state.total = state.allAssignments.length;
      let pendingAssignment = state.allAssignments.filter(
        (a) => a.status === 'pending'
      );
      state.pending = pendingAssignment.length;
      state.mark_sent = state.total - state.pending;

    },
  },
});

export const { assignments } = assignmentMarkSlice.actions;
export default assignmentMarkSlice.reducer;
