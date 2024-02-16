import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LearningPortal from '../../assets/image/learningportal.svg';
import { useRegisterMutation } from '../../features/auth/authApi';
import Error from '../ui/Error';
import { selectUser } from '../../features/auth/authSelector';
export default function StudentRegistration() {
  const user = useSelector(selectUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [register, { data, error: responseError }] = useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if ((data?.accessToken && data?.user) || user) {
      navigate('/course-player');
    }
  }, [data, responseError, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (confirmPassword !== password) {
      setError('Passwords do not match');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <section className='py-6 bg-primary h-screen grid place-items-center'>
      <div className='mx-auto max-w-md px-5 lg:px-0'>
        <div>
          <img
            className='h-12 mx-auto'
            src={LearningPortal}
            alt='Learning portal'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
            Create Your New Account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <input
                id='name'
                name='name'
                type='name'
                autoComplete='name'
                required
                className='login-input rounded-t-md'
                placeholder='Student Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                className='login-input '
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
                className='login-input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='confirm-password' className='sr-only'>
                Confirm Password
              </label>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                autoComplete='confirm-password'
                required
                className='login-input rounded-b-md'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
            >
              Create Account
            </button>
          </div>
          {error !== '' && <Error message={error} />}
        </form>
      </div>
    </section>
  );
}
