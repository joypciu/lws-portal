import { useFetchVideosQuery } from '../../../features/Videos/videoApi';
import AdminNavbar from '../AdminNavbar';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import { useNavigate } from 'react-router-dom';
import ShowSingleVideoInRaw from './ShowSingleVideoInRaw';

export default function ShowVideos() {
  const navigate = useNavigate();
  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useFetchVideosQuery();

  let content;
  if (isLoading && !isSuccess) {
    content = <Loading />;
  }
  if (isSuccess && videos.length > 0) {
    content = (
      <div className='overflow-x-auto mt-4'>
        <table className='divide-y-1 text-base divide-gray-600 w-full'>
          <thead>
            <tr>
              <th className='table-th'>Video Title</th>
              <th className='table-th'>Description</th>
              <th className='table-th'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-600/50'>
            {videos.map((video) => (
              <ShowSingleVideoInRaw key={video.id} video={video} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (isSuccess && videos.length === 0) {
    content = <h3>No videos available. Add video by clicking add button</h3>;
  }
  if (isError) {
    content = <Error message={'Error fetching videos'} refetch={refetch} />;
  }

  return (
    <>
      <AdminNavbar />
      <section className='py-6 bg-primary'>
        <div className='mx-auto max-w-full px-5 lg:px-20'>
          <div className='px-3 py-20 bg-opacity-10'>
            <div className='w-full flex'>
              <button
                className='btn ml-auto'
                onClick={() => navigate('/admin/add-video')}
              >
                Add Video
              </button>
            </div>
            {content}
          </div>
        </div>
      </section>
    </>
  );
}
