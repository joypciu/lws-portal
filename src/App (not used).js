// import { Route, Routes } from 'react-router-dom';
// import AdminLogin from './components/pages/AdminLogin';
// import AdminRoute from './components/AdminRoute';
// import UserRoute from './components/UserRoute';
// import Dashboard from './components/Admin-Dashboard/Dashboard';
// import ShowAssignments from './components/Admin-Dashboard/assignment/ShowAssignments';
// import AssignmentMark from './components/Admin-Dashboard/assignment mark/AssignmentMark';
// import ShowQuizzes from './components/Admin-Dashboard/quiz/ShowQuizzes';
// import ShowVideos from './components/Admin-Dashboard/videos/ShowVideos';
// import StudentLogin from './components/pages/StudentLogin';
// import StudentRegistration from './components/pages/StudentRegistration';
// import CoursePlayer from './components/StudentPortal/CoursePlayer/CoursePlayer';
// import Leaderboard from './components/StudentPortal/Leaderboard';
// import Quiz from './components/StudentPortal/Quiz';
// import useAuthCheck from './hooks/useAuthCheck';
// import useAdminAuthCheck from './hooks/useAdminAuthCheck';
// import AddVideo from './components/Admin-Dashboard/videos/AddVideo';
// import EditVideo from './components/Admin-Dashboard/videos/EditVideo';
// import AddAssignment from './components/Admin-Dashboard/assignment/AddAssignment';
// import EditAssignment from './components/Admin-Dashboard/assignment/EditAssignment';
// import AddQuiz from './components/Admin-Dashboard/quiz/AddQuiz';
// import EditQuiz from './components/Admin-Dashboard/quiz/EditQuiz';

// function App() {
//   const isUserLoggedIn = useAuthCheck();
//   const isAdminLoggedIn = useAdminAuthCheck();

//   return (
//     <Routes>
//       {['/', '/login'].map((path) => (
//         <Route key={path} path={path} element={<StudentLogin />} />
//       ))}
//       <Route path='/register' element={<StudentRegistration />} />
//       <Route path='/admin' element={<AdminLogin />} />
//       <Route path='*' element={<div>No page found!</div>} />

//       {isUserLoggedIn && (
//         <>
//           <Route
//             path='/course-player'
//             element={
//               <UserRoute>
//                 <CoursePlayer />
//               </UserRoute>
//             }
//           />
//           <Route
//             path='/leaderboard'
//             element={
//               <UserRoute>
//                 <Leaderboard />
//               </UserRoute>
//             }
//           />
//           <Route
//             path='/quiz/:videoId'
//             element={
//               <UserRoute>
//                 <Quiz />
//               </UserRoute>
//             }
//           />
//         </>
//       )}
//       {isAdminLoggedIn && (
//         <>
//           <Route
//             path='/admin/dashboard'
//             element={
//               <AdminRoute>
//                 <Dashboard />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/assignments'
//             element={
//               <AdminRoute>
//                 <ShowAssignments />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/assignment-mark'
//             element={
//               <AdminRoute>
//                 <AssignmentMark />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/quizzes'
//             element={
//               <AdminRoute>
//                 <ShowQuizzes />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/videos'
//             element={
//               <AdminRoute>
//                 <ShowVideos />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/add-video'
//             element={
//               <AdminRoute>
//                 <AddVideo />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/videos/edit/:videoId'
//             element={
//               <AdminRoute>
//                 <EditVideo />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/add-assignment'
//             element={
//               <AdminRoute>
//                 <AddAssignment />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/assignments/edit/:assignmentId'
//             element={
//               <AdminRoute>
//                 <EditAssignment />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/add-quiz'
//             element={
//               <AdminRoute>
//                 <AddQuiz />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path='/admin/quizzes/edit/:quizId'
//             element={
//               <AdminRoute>
//                 <EditQuiz />
//               </AdminRoute>
//             }
//           />
//         </>
//       )}
//     </Routes>
//   );
// }

// export default App;
