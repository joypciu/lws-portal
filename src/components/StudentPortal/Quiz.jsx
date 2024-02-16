import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useFetchQuizzesQuery } from '../../features/quizzes/quizApi';
import StudentNavbar from './StudentNavbar';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import {
  useAddQuizMarkMutation,
  useFetchSingleQuizMarkByStudentAndVideoIdQuery,
} from '../../features/quizMarks/quizMarkApi';
import { useSelector } from 'react-redux';
import calculateMarksAndOtherThingsForQuiz from '../../helpers/calculateMarksAndOtherThingsForQuiz';
import { selectUser } from '../../features/auth/authSelector';

export default function Quiz() {
  const user = useSelector(selectUser);
  const userId = Number(user.id);
  const [alreadySubmitted, setAlreadySubmitted] = useState(undefined);
  const navigate = useNavigate();
  let { videoId } = useParams();
  videoId = Number(videoId);
  const {
    data: quizzes,
    isLoading,
    isSuccess,
    isError,
  } = useFetchQuizzesQuery();
  const {
    data: mark,
    isSuccess: fetchingMarkSuccess,
    isLoading: fetchingMarkLoad,
  } = useFetchSingleQuizMarkByStudentAndVideoIdQuery({ userId, videoId });
  const [addQuizMark] = useAddQuizMarkMutation();

  const [currQuiz, setCurrQuiz] = useState(undefined);
  const [totalMark, setTotalMark] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  let content;

  useEffect(() => {
    let allQuizzesAvailable;
    if (!isLoading && isSuccess) {
      allQuizzesAvailable = quizzes.filter(
        (q) => q.video_id === Number(videoId)
      );
      setCurrQuiz(allQuizzesAvailable);
      setTotalMark(allQuizzesAvailable.length * 5);
    }
  }, [isLoading, isSuccess, quizzes, videoId]);

  useEffect(() => {
    if (!fetchingMarkLoad && fetchingMarkSuccess) {
      if (mark?.length <= 0) {
        setAlreadySubmitted(undefined);
      } else {
        setAlreadySubmitted(true);
      }
    }
  }, [
    fetchingMarkSuccess,
    setAlreadySubmitted,
    mark,
    alreadySubmitted,
    fetchingMarkLoad,
  ]);

  function handleOptionSelect(event) {
    const { name, value, checked } = event.target;
    setSelectedAnswers((prevState) => {
      if (checked) {
        // Item is checked, set to true
        return { ...prevState, [name]: value };
      } else {
        // Item is unchecked, remove it from state
        const { [name]: omit, ...rest } = prevState;
        return rest;
      }
    });
  }

  function handleQuizSubmit(e) {
    e.preventDefault();

    let { total_correct, total_wrong, marks } =
      calculateMarksAndOtherThingsForQuiz(currQuiz, selectedAnswers);
    const data = {
      student_id: user.id,
      student_name: user.name,
      video_id: Number(videoId),
      video_title: currQuiz[0].video_title,
      totalQuiz: currQuiz.length,
      totalCorrect: total_correct,
      totalWrong: total_wrong,
      totalMark: totalMark,
      mark: marks,
    };
    addQuizMark(data);
    navigate('/leaderboard');
  }
  if (alreadySubmitted === true) {
    return (
      <section className='py-6 bg-primary'>
        <h3>You have already submitted the quiz.go back!!</h3>
      </section>
    );
  }

  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <Error message={'Error fetching quizzes'} />;
  }
  if (!isLoading && isSuccess && currQuiz !== undefined) {
    content = (
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold'>
            Quizzes for "{currQuiz[0].video_title}"
          </h1>
          <p className='text-sm text-slate-200'>
            Each question contains 5 Mark
          </p>
        </div>
        <div className='space-y-8 '>
          {currQuiz.map((quiz, quizIndex) => (
            <div key={quiz.id} className='quiz'>
              <h4 className='question'>
                Quiz {quizIndex + 1} - {quiz.question}
              </h4>
              <form className='quizOptions'>
                {quiz.options.map((option, optionIndex) => (
                  <label
                    key={option.id}
                    htmlFor={`option${optionIndex + 1}_q${quizIndex + 1}`}
                  >
                    <input
                      name={`${quizIndex + 1}${option.id}`}
                      type='checkbox'
                      id={`option${optionIndex + 1}_q${quizIndex + 1}`}
                      value={option.isCorrect}
                      onChange={handleOptionSelect}
                    />
                    {option.option}
                  </label>
                ))}
              </form>
            </div>
          ))}
          <button
            onClick={handleQuizSubmit}
            type='submit'
            className='px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 '
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <StudentNavbar />
      <section className='py-6 bg-primary'>{content}</section>
    </>
  );
}
