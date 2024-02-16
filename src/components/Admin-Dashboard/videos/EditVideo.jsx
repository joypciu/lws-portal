import { useGetSingleVideoQuery } from '../../../features/Videos/videoApi';
import AdminNavbar from '../AdminNavbar';

import EditVideoForm from './EditVideoForm';

export default function EditVideo({ id }) {
  const { data: video, isSuccess } = useGetSingleVideoQuery(id);

  return (
    <div className='container relative'>
      <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
        <AdminNavbar />
        <h1 className='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>
          Edit Video
        </h1>

        {isSuccess ? (
          <EditVideoForm video={video} id={id} />
        ) : (
          <h3>No video exist with videoId of {id}</h3>
        )}
      </main>
    </div>
  );
}
