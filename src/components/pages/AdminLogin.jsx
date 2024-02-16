import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import learningPortalImage from '../../assets/image/learningportal.svg';
import { useAdminLoginMutation } from '../../features/auth/authApi';
import Error from '../ui/Error';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../features/auth/authSelector';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const admin = useSelector(selectAdmin);
  const [adminLogin, { data, error: responseError }] = useAdminLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.admin || admin) {
      navigate('/admin/dashboard');
    }
  }, [data, responseError, navigate, admin]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    adminLogin({
      email,
      password,
    });
  };
  return (
    <section className='py-6 bg-primary h-screen grid place-items-center'>
      <div className='mx-auto max-w-md px-5 lg:px-0'>
        <div>
          <img
            className='h-12 mx-auto'
            src={learningPortalImage}
            alt='learning portal'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
            Sign in to Admin Account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='login-input rounded-t-md'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='login-input rounded-b-md'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className='text-sm'>
              <Link
                to='/admin'
                className='font-medium text-violet-600 hover:text-violet-500'
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
              Sign in
            </button>
          </div>
          {error !== '' && <Error message={error} />}
        </form>
      </div>
    </section>
  );
}
