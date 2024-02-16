import { Route } from 'react-router-dom';
import UserRoute from '../components/UserRoute';
import { lazy } from 'react';
const CoursePlayer = lazy(() =>
  import('../components/StudentPortal/CoursePlayer/CoursePlayer')
);
const Leaderboard = lazy(() =>
  import('../components/StudentPortal/Leaderboard')
);
const Quiz = lazy(() => import('../components/StudentPortal/Quiz'));

const userRoutes = [
  <Route
    key='/course-player'
    path='/course-player'
    element={
      <UserRoute>
        <CoursePlayer />
      </UserRoute>
    }
  />,
  <Route
    key='/leaderboard'
    path='/leaderboard'
    element={
      <UserRoute>
        <Leaderboard />
      </UserRoute>
    }
  />,
  <Route
    key='/quiz/:videoId'
    path='/quiz/:videoId'
    element={
      <UserRoute>
        <Quiz />
      </UserRoute>
    }
  />,
  <Route
    key='/quiz/*'
    path='/quiz/*'
    element={
      <div>
        <h3>No Page found</h3>
      </div>
    }
  />,
];

export default userRoutes;
