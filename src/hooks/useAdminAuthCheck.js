import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLoggedIn } from '../features/auth/authSlice';

export default function useAdminAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAdminAuth = localStorage?.getItem('adminAuth');

    if (localAdminAuth) {
      const auth = JSON.parse(localAdminAuth);
      if (auth?.adminAccessToken && auth?.admin) {
        dispatch(
          adminLoggedIn({
            adminAccessToken: auth.adminAccessToken,
            admin: auth.admin,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
