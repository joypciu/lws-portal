import React, { useState } from 'react';
import Modal from '../../../ui/Modal';
import { Link } from 'react-router-dom';

export default function PlayerBody({
  video,
  formattedDate,
  userSubmittedAssignment,
  assignment,
  userSubmittedQuiz,
  quizAvailable,
  user,

  selected,
}) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className='col-span-full w-full space-y-8 lg:col-span-2'>
      <iframe
        width='100%'
        className='aspect-video'
        src={video.url}
        title={video.title}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>

      <div>
        <h1 className='text-lg font-semibold tracking-tight text-slate-100'>
          {video.title}
        </h1>
        <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
          Uploaded on {formattedDate}
        </h2>

        <div className='flex gap-4'>
          {userSubmittedAssignment !== undefined && (
            <>
              <h3 className='px-3 font-bold py-1 border border-cyan text-red rounded-full text-sm hover:bg-cyan hover:text-secondary'>
                Assignment Submitted
              </h3>
            </>
          )}
          {assignment !== undefined &&
            userSubmittedAssignment === undefined && (
              <>
                <button
                  onClick={toggleModal}
                  className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
                >
                  এসাইনমেন্ট
                </button>
                <Modal
                  user={user}
                  modal={modal}
                  toggleModal={toggleModal}
                  assignment={assignment}
                />
              </>
            )}

          {assignment === undefined && (
            <h4 className='px-3 font-bold py-1 border border-cyan text-red rounded-full text-sm hover:bg-cyan hover:text-secondary'>
              কোনো এসাইনমেন্ট নেই
            </h4>
          )}
          {userSubmittedQuiz !== undefined && (
            <>
              <h3 className='px-3 font-bold py-1 border border-cyan text-red rounded-full text-sm hover:bg-cyan hover:text-secondary'>
                Quiz Submitted
              </h3>
            </>
          )}
          {quizAvailable !== undefined && userSubmittedQuiz === undefined && (
            <>
              <Link
                to={`/quiz/${selected}`}
                className='px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary'
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            </>
          )}
          {quizAvailable === undefined && (
            <h3 className='px-3 font-bold py-1 border border-cyan text-red rounded-full text-sm hover:bg-cyan hover:text-secondary'>
              কোন কুইজ নেই
            </h3>
          )}
        </div>
        <p className='mt-4 text-sm text-slate-400 leading-6'>
          {video.description}
        </p>
      </div>
    </div>
  );
}
