import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEditQuizMutation } from '../../../features/quizzes/quizApi';
import { useFetchVideosQuery } from '../../../features/Videos/videoApi';

export default function EditQuiztForm({ id, quiz }) {
  const navigate = useNavigate();
  const [editQuiz] = useEditQuizMutation();
  const { data: videos, isSuccess: videosLoadingSuccess } =
    useFetchVideosQuery();
  const initialState = {
    question: '',
    video_title: '',
  };

  const [data, setData] = useState(initialState);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setData({
      question: quiz.question,
      video_title: quiz.video_title,
    });
    setOptions(quiz.options);
  }, [quiz]);
  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].option = event.target.value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (event, index) => {
    const newOptions = [...options];

    newOptions[index] = {
      ...newOptions[index],
      isCorrect: !newOptions[index].isCorrect,
    };

    setOptions(newOptions);
  };

  function handleChangeData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();

    let video = videos.filter((video) => video.title === data.video_title)[0];
    let video_id = video.id;

    const updatedData = {
      question: data.question,
      video_id: video_id,
      video_title: data.video_title,
      options: options,
    };

    editQuiz({ id, updatedData });
    navigate('/admin/quizzes');
  }

  return (
    <>
      <div className='container'>
        <main>
          <h1 className='text-center text-3xl font-bold text-gray-800 mt-8 mb-4'>
            Edit Quiz
          </h1>

          <div className='max-w-lg mx-auto'>
            <form
              onSubmit={handleSubmit}
              className='bg-gray-100 p-6 rounded-lg'
            >
              <div className='mb-4'>
                <label htmlFor='title' className='block font-medium mb-2'>
                  Question
                </label>
                <input
                  type='text'
                  name='question'
                  id='question'
                  required
                  placeholder='Provide Question'
                  value={data.question}
                  onChange={handleChangeData}
                  className='w-full px-4 py-2 border rounded-lg'
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='video_title' className='block font-medium mb-2'>
                  Assign this Quiz to video
                </label>
                <select
                  name='video_title'
                  id='video_title'
                  required
                  onChange={handleChangeData}
                  className='w-full px-4 py-2 border rounded-lg'
                >
                  <option value={data.video_title}>{data.video_title}</option>
                  {videosLoadingSuccess &&
                    videos
                      .filter((video) => video.title !== data.video_title)
                      .map((video) => (
                        <option key={video.id}>{video.title}</option>
                      ))}
                </select>
              </div>
              {options.map((option, index) => (
                <div key={option.id} className='quiz-option-container'>
                  <div className='quiz-option-label-container'>
                    <label
                      className='quiz-label'
                      htmlFor={`option-${option.id}`}
                    >{`Option ${option.id}:`}</label>
                    <input
                      className='quiz-text  w-full'
                      type='text'
                      id={`option-${option.id}`}
                      value={option.option}
                      onChange={(event) => handleOptionChange(event, index)}
                      required
                    />
                  </div>

                  <div className='quiz-option-correct-container'>
                    <input
                      type='checkbox'
                      id={`correct-option-${option.id}`}
                      name='correct-option'
                      value={option.isCorrect}
                      checked={option.isCorrect}
                      onChange={(event) =>
                        handleCorrectOptionChange(event, index)
                      }
                    />
                    <label
                      className='quiz-correct-label'
                      htmlFor={`correct-option-${option.id}`}
                    >
                      Correct Option
                    </label>
                  </div>
                </div>
              ))}

              <div className='flex flex-col mt-6 items-center'>
                <button type='submit' className='w-full md:w-64'>
                  Edit Question
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
