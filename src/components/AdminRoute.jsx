import { Navigate } from 'react-router-dom';

import useAdminAuth from '../hooks/useAdminAuth';

export default function AdminRoute({ children }) {
  const isLoggedIn = useAdminAuth();

  return isLoggedIn ? children : <Navigate to='/admin' />;
}
