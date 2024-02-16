import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import useAuthCheck from './hooks/useAuthCheck';
import useAdminAuthCheck from './hooks/useAdminAuthCheck';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import PageNotFound from './components/ui/PageNotFound';

const StudentLogin = lazy(() => import('./components/pages/StudentLogin'));
const StudentRegistration = lazy(() =>
  import('./components/pages/StudentRegistration')
);
const AdminLogin = lazy(() => import('./components/pages/AdminLogin'));

function NewApp() {
  const isUserLoggedIn = useAuthCheck();
  const isAdminLoggedIn = useAdminAuthCheck();
  const allAccessRoutes = [
    <Route key='home/login' path='/' element={<StudentLogin />} />,
    <Route key='login' path='/login' element={<StudentLogin />} />,
    <Route key='register' path='/register' element={<StudentRegistration />} />,
    <Route key='admin' path='/admin' element={<AdminLogin />} />,
    <Route key='notFound' path='*' element={<PageNotFound />} />,
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {allAccessRoutes}
        {isUserLoggedIn && userRoutes}
        {isAdminLoggedIn && adminRoutes}
      </Routes>
    </Suspense>
  );
}

export default NewApp;
