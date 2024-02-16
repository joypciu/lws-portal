import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddQuizMutation } from '../../../features/quizzes/quizApi';
import { useFetchVideosQuery } from '../../../features/Videos/videoApi';
import AdminNavbar from '../AdminNavbar';
export default function AddQuiz() {
  const navigate = useNavigate();
  const { data: videos, isSuccess: videosLoadingSuccess } =
    useFetchVideosQuery();
  const [addQuiz] = useAddQuizMutation();
  const [options, setOptions] = useState([
    { id: 1, option: '', isCorrect: false },
    { id: 2, option: '', isCorrect: false },
    { id: 3, option: '', isCorrect: false },
    { id: 4, option: '', isCorrect: false },
  ]);
  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].option = event.target.value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (event, index) => {
    const newOptions = [...options];
    if (event.target.checked) {
      newOptions[index].isCorrect = true;
    }
    setOptions(newOptions);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    let video = videos.filter(
      (video) => video.title === formData.video_title
    )[0];
    let video_id = video.id;
    const data = {
      question: formData.question,
      video_id: video_id,
      video_title: formData.video_title,
      options: options,
    };
    addQuiz(data);
    navigate('/admin/quizzes');
  }
  return (
    <>
      <AdminNavbar />
      <div className='container'>
        <main>
          <h1 className='text-center text-3xl font-bold text-gray-800 mt-8 mb-4'>
            Add Quiz
          </h1>
          <div className='max-w-lg mx-auto'>
            <form
              onSubmit={handleSubmit}
              className='bg-gray-100 p-6 rounded-lg'
            >
              <div className='mb-4'>
                <label htmlFor='question' className='block font-medium mb-2'>
                  Question
                </label>
                <input
                  type='text'
                  name='question'
                  id='question'
                  required
                  placeholder='Provide Question'
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
                  className='w-full px-4 py-2 border rounded-lg'
                >
                  <option value='' hidden defaultValue={''}>
                    Select Video
                  </option>
                  {videosLoadingSuccess &&
                    videos.map((video) => (
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
                      className='quiz-text w-full'
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
                  ADD Question
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
