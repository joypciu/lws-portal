import { Link } from 'react-router-dom';
import Error from '../../ui/Error';
import Loading from '../../ui/Loading';

export default function CourseVideoList({
  selected,
  setSelected,
  videos,
  isLoading,
  isSuccess,
  refetch,
  isError,
}) {
  function handleClick(id) {
    setSelected(id);
  }
  let content;
  if (isLoading && !isSuccess) {
    content = <Loading />;
  }
  if (isSuccess && videos.length > 0) {
    content = videos.map((video) => (
      <div
        key={video.id}
        className={`w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2  ${
          selected === video.id && 'py-3'
        } `}
        onClick={() => handleClick(video.id)}
      >
        {/* <!-- Thumbnail --> */}
        <svg
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
          />
        </svg>
        {/* <!-- Description --> */}
        <div className='flex flex-col w-full'>
          <Link>
            <p className='text-slate-50 text-sm font-medium'>{video.title}</p>
          </Link>
          <div>
            <span className='text-gray-400 text-xs mt-1'>
              {video.duration} Mins
            </span>
            <span className='text-gray-400 text-xs mt-1'> | </span>
            <span className='text-gray-400 text-xs mt-1'>
              {video.views} views
            </span>
          </div>
        </div>
      </div>
    ));
  }
  if (isSuccess && videos.length === 0) {
    content = <h3>No video is available.ask admin to add videos.</h3>;
  }
  if (isError) {
    content = <Error message={'Error fetching videos'} refetch={refetch} />;
  }
  return (
    <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30'>
      {content}
    </div>
  );
}
