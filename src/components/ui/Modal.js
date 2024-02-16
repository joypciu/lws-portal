import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../../assets/style/modal.css';
import { useAddAssignmentMarkMutation } from '../../features/assignmentMarks/assignmentMarkApi';

export default function Modal({ modal, toggleModal, assignment, user }) {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const [addAssignmentMark] = useAddAssignmentMarkMutation();

  function handleSubmit(e) {
    e.preventDefault();
    const createdAt = new Date();
    const isoDate = createdAt.toISOString();
    const data = {
      student_id: user.id,
      student_name: user.name,
      assignment_id: assignment.id,
      title: assignment.title,
      createdAt: isoDate,
      totalMark: assignment.totalMark,
      mark: 0,
      repo_link: url,
      status: 'pending',
    };

    addAssignmentMark(data);
    navigate('/course-player');
  }
  function handleChange(e) {
    setUrl(e.target.value);
  }

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <div className='mx-auto max-w-md px-5 lg:px-0'>
              <h1 className='mt-4 mb-4 text-3xl font-bold text-center text-gray-800'>
                Assignment Submission
              </h1>
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#1e1e1e',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    htmlFor='url'
                    style={{ color: '#fff', marginBottom: '0.5rem' }}
                  >
                    Repo Link
                  </label>
                  <input
                    // autoComplete='off'
                    type='url'
                    id='url'
                    name='url'
                    placeholder='enter Repo Link'
                    required
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      marginBottom: '1rem',
                      width: '100%',
                    }}
                    value={url}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <button
                      type='submit'
                      className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
                    >
                      Submit Assignment
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <button className='close-modal' onClick={toggleModal}></button>
          </div>
        </div>
      )}
    </>
  );
}
