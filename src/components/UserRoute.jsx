import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function UserRoute({ children }) {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to='/' />;
}
