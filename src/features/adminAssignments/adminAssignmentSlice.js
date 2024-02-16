import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allAssignments: [],
};
const adminAssignmentSlice = createSlice({
  name: 'adminAssignmentSlice',
  initialState,
  reducers: {
    getAllAssignments: (state, action) => {
      state.allAssignments = action.payload.all;
    },
    checkVideoForAssignment: (state, action) => {
      let videoExist = state.allAssignments.find(
        (a) => a.video_id === action.payload.videoId
      );
      return videoExist;
    },
  },
});

export const { getAllAssignments, checkVideoForAssignment } =
  adminAssignmentSlice.actions;
export default adminAssignmentSlice.reducer;
