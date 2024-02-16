import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useEditAssignmentMutation,
  useFetchAssignmentsQuery,
} from '../../../features/adminAssignments/adminAssignemntApi';
import { useFetchVideosQuery } from '../../../features/Videos/videoApi';

export default function EditAssignmentForm({ id, assignment }) {
  const [a, setA] = useState([]);
  const [videoWithAssignmentAlreadyExist, setVideoWithAssignmentAlreadyExist] =
    useState(-1);
  const navigate = useNavigate();
  const [editAssignment] = useEditAssignmentMutation();
  const { data: videos, isSuccess: videosLoadingSuccess } =
    useFetchVideosQuery();
  const {
    data: assignments,
    isLoading: aLoading,
    isSuccess: aSuccess,
  } = useFetchAssignmentsQuery();

  const initialState = {
    title: '',
    video_id: -1,
    video_title: '',
    totalMark: -1,
  };
  const [data, setData] = useState(initialState);
  useEffect(() => {
    setData({
      title: assignment.title,
      video_id: assignment.video_id,
      video_title: assignment.video_title,
      totalMark: assignment.totalMark,
    });
    if (!aLoading && aSuccess) {
      setA(assignments);
    }
  }, [assignment, aLoading, aSuccess, assignments]);

  function handleChangeData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === 'video_title') {
      let exist = a.findIndex((a) => a.video_title === e.target.value);
      setVideoWithAssignmentAlreadyExist(exist);
      console.log(exist);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    let video = videos.filter((video) => video.title === data.video_title)[0];
    let video_id = video.id;

    const updatedData = {
      title: data.title,
      video_id: video_id,
      video_title: data.video_title,
      totalMark: Number(data.totalMark),
    };

    if (videoWithAssignmentAlreadyExist >= 0) {
      alert('this video already contains assignment.choose another video');
    } else {
      editAssignment({ id, updatedData });
      navigate('/admin/assignments');
    }
  }

  return (
    <>
      <div className='container relative'>
        <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
          <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6 bg-gray-900 p-8 rounded-lg'
            >
              <div className='flex flex-col'>
                <label htmlFor='title' className='text-white'>
                  Assignment Name
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  required
                  placeholder='Give a title'
                  value={data.title}
                  onChange={handleChangeData}
                  className='rounded-md bg-gray-700 py-2 px-3 text-white'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='video_title' className='text-white'>
                  Assign this Assignment to video
                </label>
                <select
                  name='video_title'
                  id='video_title'
                  required
                  onChange={handleChangeData}
                  className='rounded-md bg-gray-700 py-2 px-3 text-white'
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

              <div className='flex flex-col'>
                <label htmlFor='totalMark' className='text-white'>
                  Total mark
                </label>
                <input
                  type='number'
                  name='totalMark'
                  id='totalMark'
                  required
                  value={data.totalMark}
                  onChange={handleChangeData}
                  className='rounded-md bg-gray-700 py-2 px-3 text-white'
                />
              </div>

              <div className='flex flex-col'>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md'
                >
                  Edit Assignment
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
