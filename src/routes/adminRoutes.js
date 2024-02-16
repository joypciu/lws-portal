import { Route } from 'react-router-dom';
import AdminRoute from '../components/AdminRoute';
import { lazy } from 'react';
import {
  EditAssignmentWrapper,
  EditQuizWrapper,
  EditVideoWrapper,
} from '../helpers/validationOfPage';

const Dashboard = lazy(() => import('../components/Admin-Dashboard/Dashboard'));
const ShowAssignments = lazy(() =>
  import('../components/Admin-Dashboard/assignment/ShowAssignments')
);
const AssignmentMark = lazy(() =>
  import('../components/Admin-Dashboard/assignment mark/AssignmentMark')
);
const ShowQuizzes = lazy(() =>
  import('../components/Admin-Dashboard/quiz/ShowQuizzes')
);
const ShowVideos = lazy(() =>
  import('../components/Admin-Dashboard/videos/ShowVideos')
);
const AddVideo = lazy(() =>
  import('../components/Admin-Dashboard/videos/AddVideo')
);
const AddAssignment = lazy(() =>
  import('../components/Admin-Dashboard/assignment/AddAssignment')
);
const AddQuiz = lazy(() =>
  import('../components/Admin-Dashboard/quiz/AddQuiz')
);

const adminRoutes = [
  <Route
    key='dashboard'
    path='/admin/dashboard'
    element={
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    }
  />,
  <Route
    key='assignments'
    path='/admin/assignments'
    element={
      <AdminRoute>
        <ShowAssignments />
      </AdminRoute>
    }
  />,
  <Route
    key='assignmentMark'
    path='/admin/assignment-mark'
    element={
      <AdminRoute>
        <AssignmentMark />
      </AdminRoute>
    }
  />,
  <Route
    key='quizzes'
    path='/admin/quizzes'
    element={
      <AdminRoute>
        <ShowQuizzes />
      </AdminRoute>
    }
  />,
  <Route
    key='videos'
    path='/admin/videos'
    element={
      <AdminRoute>
        <ShowVideos />
      </AdminRoute>
    }
  />,
  <Route
    key='addVideo'
    path='/admin/add-video'
    element={
      <AdminRoute>
        <AddVideo />
      </AdminRoute>
    }
  />,
  <Route
    key='editVideo'
    path='/admin/videos/edit/:videoId'
    element={
      <AdminRoute>
        <EditVideoWrapper />
      </AdminRoute>
    }
  />,
  <Route
    key='addAssignment'
    path='/admin/add-assignment'
    element={
      <AdminRoute>
        <AddAssignment />
      </AdminRoute>
    }
  />,
  <Route
    key='editAssignment'
    path='/admin/assignments/edit/:assignmentId'
    element={<EditAssignmentWrapper />}
  />,
  <Route
    key='addQuiz'
    path='/admin/add-quiz'
    element={
      <AdminRoute>
        <AddQuiz />
      </AdminRoute>
    }
  />,
  <Route
    key='editQuiz'
    path='/admin/quizzes/edit/:quizId'
    element={
      <AdminRoute>
        <EditQuizWrapper />
      </AdminRoute>
    }
  />,
];

export default adminRoutes;
