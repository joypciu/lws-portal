import { useParams } from 'react-router-dom';

import AdminRoute from '../components/AdminRoute';
import { useGetSingleAssignmentQuery } from '../features/adminAssignments/adminAssignemntApi';
import { lazy, useEffect, useState } from 'react';
import PageNotFound from '../components/ui/PageNotFound';
import { useGetSingleQuizQuery } from '../features/quizzes/quizApi';
import { useGetSingleVideoQuery } from '../features/Videos/videoApi';

const EditVideo = lazy(() =>
  import('../components/Admin-Dashboard/videos/EditVideo')
);
const EditAssignment = lazy(() =>
  import('../components/Admin-Dashboard/assignment/EditAssignment')
);
const EditQuiz = lazy(() =>
  import('../components/Admin-Dashboard/quiz/EditQuiz')
);

export function EditVideoWrapper() {
  let { videoId } = useParams();
  const [isValid, setIsValid] = useState(false);
  const { isSuccess, isLoading } = useGetSingleVideoQuery(Number(videoId));

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setIsValid(true);
    }
  }, [isSuccess, isLoading]);

  if (isValid === false) {
    return <PageNotFound />;
  } else {
    videoId = Number(videoId);
    return (
      <AdminRoute>
        <EditVideo id={videoId}/>
      </AdminRoute>
    );
  }
}

export function EditQuizWrapper() {
  let { quizId } = useParams();
  const [isValid, setIsValid] = useState(false);
  const { isSuccess, isLoading } = useGetSingleQuizQuery(Number(quizId));

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setIsValid(true);
    }
  }, [isSuccess, isLoading]);

  if (isValid === false) {
    return <PageNotFound />;
  } else {
    quizId = Number(quizId);
    return (
      <AdminRoute>
        <EditQuiz id={quizId} />
      </AdminRoute>
    );
  }
}
export function EditAssignmentWrapper() {
  let { assignmentId } = useParams();
  const [isValid, setIsValid] = useState(false);
  const { isSuccess, isLoading } = useGetSingleAssignmentQuery(
    Number(assignmentId)
  );
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setIsValid(true);
    }
  }, [isSuccess, isLoading]);

  if (isValid === false) {
    return <PageNotFound />;
  } else {
    assignmentId = Number(assignmentId);
    return (
      <AdminRoute>
        <EditAssignment id={assignmentId} />
      </AdminRoute>
    );
  }
}
