
import { useNavigate } from 'react-router-dom';
import {
  useAddAssignmentMutation,
  useFetchAssignmentsQuery,
} from '../../../features/adminAssignments/adminAssignemntApi';
import { useFetchVideosQuery } from '../../../features/Videos/videoApi';
import AdminNavbar from '../AdminNavbar';

export default function AddAssignment() {
  const navigate = useNavigate();
  const { data: videos, isSuccess: videosLoadingSuccess } =
    useFetchVideosQuery();
  const [addAssignment] = useAddAssignmentMutation();
  const {
    data: assignments,
    isLoading: aLoading,
    isSuccess: aSuccess,
  } = useFetchAssignmentsQuery();

  function handleSubmit(event) {
    event.preventDefault();
    let videoAlreadyContainAssignment;
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    let video = videos.filter(
      (video) => video.title === formData.video_title
    )[0];
    let video_id = video.id;

    const data = {
      title: formData.title,
      video_id: video_id,
      video_title: formData.video_title,
      totalMark: Number(formData.totalMark),
    };

    if (!aLoading && aSuccess) {
      videoAlreadyContainAssignment = assignments.filter(
        (a) => a.video_id === Number(video_id)
      );
    }

    if (videoAlreadyContainAssignment.length > 0) {
      alert(
        'video already contains assignment. assign new video for assignment'
      );
    } else {
      addAssignment(data);
      navigate('/admin/assignments');
    }
  }
  return (
    <>
      <AdminNavbar />
      <div className='container relative'>
        <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
          <h1 className='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>
            Add Assignment
          </h1>

          <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6 bg-gray-900 p-8 rounded-lg'
            >
              <div className='flex flex-col'>
                <label htmlFor='title' className='text-gray-400'>
                  Assignment Name
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  required
                  placeholder='Give a title'
                  className='bg-gray-800 text-gray-100 rounded-md p-2 mt-2'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='video_title' className='text-gray-400'>
                  Assign this Assignment to video
                </label>
                <select
                  name='video_title'
                  id='video_title'
                  required
                  className='bg-gray-800 text-gray-100 rounded-md p-2 mt-2'
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

              <div className='flex flex-col'>
                <label htmlFor='totalMark' className='text-gray-400'>
                  Total mark
                </label>
                <input
                  type='number'
                  name='totalMark'
                  id='totalMark'
                  required
                  className='bg-gray-800 text-gray-100 rounded-md p-2 mt-2'
                />
              </div>

              <div className='flex flex-col'>
                <button
                  type='submit'
                  className='bg-green-500 text-gray-100 rounded-md p-2 mt-4'
                >
                  ADD Assignment
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
