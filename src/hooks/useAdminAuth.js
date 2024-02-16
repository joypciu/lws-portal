import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSelector';

export default function useAdminAuth() {
  const auth = useSelector(selectAuth);

  if (auth?.adminAccessToken && auth?.admin) {
    return true;
  } else {
    return false;
  }
}
