import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAssignmentMarksQuery } from '../../../../features/assignmentMarks/assignmentMarkApi';
import { useFetchAssignmentsQuery } from '../../../../features/adminAssignments/adminAssignemntApi';
import { useFetchQuizMarksQuery } from '../../../../features/quizMarks/quizMarkApi';
import { useFetchQuizzesQuery } from '../../../../features/quizzes/quizApi';
import { useGetSingleVideoQuery } from '../../../../features/Videos/videoApi';
import Error from '../../../ui/Error';
import Loading from '../../../ui/Loading';
import PlayerBody from './PlayerBody';

export default function Player({ selected, user }) {
  const [userSubmittedAssignment, setUserSubmittedAssignment] =
    useState(undefined);
  const [userSubmittedQuiz, setUserSubmittedQuiz] = useState(undefined);

  const [assignment, setAssignment] = useState(undefined);
  const [quizAvailable, setQuizAvailable] = useState(undefined);

  const {
    data: assignmentMarks,
    isSuccess: assignmentMarksSuccess,
    isLoading: assignmentMarksLoading,
  } = useFetchAssignmentMarksQuery();
  const {
    data: quizMarks,
    isSuccess: quizMarksSuccess,
    isLoading: quizMarksLoading,
  } = useFetchQuizMarksQuery();
  const {
    data: quizzes,
    isLoading: isQuizLoading,
    isSuccess: isQuizSuccess,
  } = useFetchQuizzesQuery();

  const {
    data: video,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetSingleVideoQuery(selected);
  const {
    isSuccess: isAssignmentFetchingSuccess,
    isLoading: isAssignmentLoading,
  } = useFetchAssignmentsQuery();

  const localAssignmentsFromState = useSelector(
    (state) => state.assignments.allAssignments
  );

  useEffect(() => {
    let foundAssignment;
    if (!isAssignmentLoading && isAssignmentFetchingSuccess) {
      foundAssignment = localAssignmentsFromState.filter(
        (a) => a.video_id === selected
      )[0];
    }

    setAssignment(foundAssignment);
  }, [
    isAssignmentFetchingSuccess,
    localAssignmentsFromState,
    selected,
    isAssignmentLoading,
    assignment,
  ]);

  useEffect(() => {
    let userSubmissionFound;
    if (!assignmentMarksLoading && assignmentMarksSuccess && assignment) {
      userSubmissionFound = assignmentMarks.filter(
        (m) => m.assignment_id === assignment?.id && m.student_id === user.id
      )[0];
    }
    setUserSubmittedAssignment(userSubmissionFound);
  }, [
    assignmentMarks,
    assignmentMarksLoading,
    assignmentMarksSuccess,
    user.id,
    assignment,
  ]);

  useEffect(() => {
    let quizForSelectedVideo;
    if (!isQuizLoading && isQuizSuccess) {
      quizForSelectedVideo = quizzes.filter((q) => q.video_id === selected)[0];
    }
    setQuizAvailable(quizForSelectedVideo);
  }, [isQuizLoading, isQuizSuccess, quizzes, selected]);

  useEffect(() => {
    let userSubmissionFound;
    if (!quizMarksLoading && quizMarksSuccess) {
      userSubmissionFound = quizMarks.filter(
        (q) => q.video_id === Number(selected) && q.student_id === user.id
      )[0];
    }
    setUserSubmittedQuiz(userSubmissionFound);
  }, [
    quizMarks,
    quizMarksLoading,
    quizMarksSuccess,
    selected,
    user.id,
    userSubmittedQuiz,
  ]);

  let content;
  if (isLoading && !isSuccess) {
    content = <Loading />;
  }
  if (isSuccess && video !== undefined) {
    let date = new Date(video.createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    content = (
      <PlayerBody
        video={video}
        formattedDate={formattedDate}
        userSubmittedAssignment={userSubmittedAssignment}
        assignment={assignment}
        userSubmittedQuiz={userSubmittedQuiz}
        quizAvailable={quizAvailable}
        user={user}
        selected={selected}
      />
    );
  }

  if (isError) {
    content = <Error message={'Error fetching video'} refetch={refetch} />;
  }
  return content;
}
