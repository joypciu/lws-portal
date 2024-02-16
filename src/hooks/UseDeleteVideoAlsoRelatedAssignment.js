import { useEffect, useState } from "react";
import { useDeleteAssignmentMutation, useFetchAssignmentsQuery } from "../features/adminAssignments/adminAssignemntApi";
import { useDeleteVideoMutation } from "../features/Videos/videoApi";

export default function UseDeleteVideoAlsoRelatedAssignment() {
  const [assignments, setAssignments] = useState([]);
  const { data, isSuccess, isLoading } = useFetchAssignmentsQuery();
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setAssignments(data);
    }
  }, [isSuccess, isLoading, data]);

  const [deleteVideoMutation] = useDeleteVideoMutation();

  const [deleteAssignmentMutation] = useDeleteAssignmentMutation();

  return (videoId) => {
    let assignment = assignments.filter((a) => a.video_id === videoId);
    

    if (assignment.length > 0) {
      deleteAssignmentMutation(assignment[0].id);
    }
    deleteVideoMutation(videoId);
  };
}
