import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditVideoMutation } from '../../../features/Videos/videoApi';

export default function EditVideoForm({ id, video }) {
  const navigate = useNavigate();
  const [editVideo] = useEditVideoMutation();

  const initialState = {
    title: '',
    description: '',
    url: '',
    views: '',
    duration: '',
    createdAt: '',
    min: '',
    sec: '',
  };
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const views = video.views.split(/(?=[A-Za-z])/);
    let durationArray = video.duration.split(':');
    setData({
      title: video.title,
      description: video.description,
      url: video.url,
      views: Number(views[0]),
      duration: video.duration,
      createdAt: video.createdAt,
      min: durationArray[0],
      sec: durationArray[1],
    });
  }, [video]);

  function handleChangeData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let mDate = new Date().toISOString();
    let mViews = data.views.toString().concat('k');
    if (data.min < 0 || data.sec > 60) {
      alert('provide valid minutes (>=0 ) & second ()>=0 to <=60)');
    } else {
      let duration = data.min.concat(`:${data.sec}`);
      let updatedData = {
        title: data.title,
        description: data.description,
        url: data.url,
        views: mViews,
        duration,
        createdAt: mDate,
      };
      editVideo({ id, updatedData });
      navigate('/admin/videos');
    }
  }

  return (
    <>
      <section className=' bg-primary flex items-center justify-center'>
        <div className='max-w-md w-full mx-auto px-5 lg:px-0'>
          <form
            onSubmit={handleSubmit}
            className='bg-gray-800 rounded-lg shadow-md py-6 px-8'
          >
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-white font-bold mb-2'
              >
                Title
              </label>
              <input
                type='text'
                name='title'
                id='title'
                required
                placeholder='enter title'
                value={data.title}
                onChange={handleChangeData}
                className='bg-gray-900 text-white rounded px-4 py-2 w-full'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-white font-bold mb-2'
              >
                Description
              </label>
              <textarea
                rows='8'
                id='description'
                name='description'
                placeholder='enter description'
                required
                value={data.description}
                onChange={handleChangeData}
                className='bg-gray-900 text-white rounded px-4 py-2 w-full'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='url' className='block text-white font-bold mb-2'>
                URL
              </label>
              <input
                type='url'
                id='url'
                name='url'
                placeholder='enter url'
                required
                value={data.url}
                onChange={handleChangeData}
                className='bg-gray-900 text-white rounded px-4 py-2 w-full'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='views'
                className='block text-white font-bold mb-2'
              >
                Views
              </label>
              <input
                type='number'
                step='00.01'
                id='views'
                name='views'
                placeholder='enter views'
                required
                value={data.views}
                onChange={handleChangeData}
                className='bg-gray-900 text-white rounded px-4 py-2 w-full'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='duration'
                className='block text-white font-bold mb-2'
              >
                Duration
              </label>
              <input
                value={data.min}
                onChange={handleChangeData}
                type='number'
                id='minutes'
                name='minutes'
                required
                placeholder='min'
                className='bg-gray-900 text-white rounded px-4 py-2 mr-2 w-16'
              />
              <span className='text-white m-2'>:</span>
              <input
                value={data.sec}
                onChange={handleChangeData}
                type='number'
                id='seconds'
                name='seconds'
                required
                placeholder='sec'
                className='bg-gray-900 text-white rounded px-4 py-2 w-16'
              />

              <div>
                <button
                  type='submit'
                  className='bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-violet w-full'
                >
                  Edit Video
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
