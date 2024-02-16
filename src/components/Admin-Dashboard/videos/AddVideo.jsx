import { useNavigate } from 'react-router-dom';
import { useAddVideoMutation } from '../../../features/Videos/videoApi';
import AdminNavbar from '../AdminNavbar';

export default function AddVideo() {
  const [addVideo] = useAddVideoMutation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let form = new FormData(event.target);
    let dataFromForm = Object.fromEntries(form.entries());
    dataFromForm.views = dataFromForm.views.toString().concat('k');
    let createdAt = new Date().toISOString();
    let duration = dataFromForm.minutes.concat(`:${dataFromForm.seconds}`);
    if (dataFromForm.minutes < 0 || dataFromForm.seconds > 60) {
      alert('provide valid minutes (>=0 ) & second ()>=0 to <=60)');
    } else {
      const data = {
        title: dataFromForm.title,
        description: dataFromForm.description,
        url: dataFromForm.url,
        views: dataFromForm.views,
        duration,
        createdAt,
      };
      console.log(data);
      addVideo(data);
      navigate('/admin/videos');
    }
  };

  return (
    <>
      <AdminNavbar />

      <section className=' bg-primary flex items-center justify-center'>
        <div className='max-w-md w-full mx-auto px-5 lg:px-0'>
          <h2 className='my-4 text-3xl text-center text-slate-100 font-bold'>
            Add Video
          </h2>

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
                placeholder='Enter title'
                required
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
                id='description'
                name='description'
                rows='3'
                placeholder='Enter description'
                required
                className='bg-gray-900 text-white rounded px-4 py-2 w-full'
              ></textarea>
            </div>
            <div className='mb-4'>
              <label htmlFor='url' className='block text-white font-bold mb-2'>
                URL
              </label>
              <input
                type='url'
                id='url'
                name='url'
                placeholder='Enter URL'
                required
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
                id='views'
                name='views'
                placeholder='Enter views'
                step='0.01'
                required
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
                type='number'
                id='minutes'
                name='minutes'
                required
                placeholder='min'
                className='bg-gray-900 text-white rounded px-4 py-2 mr-2 w-16'
              />
              <span className='text-white m-2'>:</span>
              <input
                type='number'
                id='seconds'
                name='seconds'
                required
                placeholder='sec'
                className='bg-gray-900 text-white rounded px-4 py-2 w-16'
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-violet w-full'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
