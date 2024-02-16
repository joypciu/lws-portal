import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StudentNavbar from '../StudentNavbar';
import CourseVideoList from './CourseVideoList';

import { useFetchVideosQuery } from '../../../features/Videos/videoApi';
import Error from '../../ui/Error';
import { selectUser } from '../../../features/auth/authSelector';
import Player from './Player/Player';

export default function CoursePlayer() {
  const {
    data: videos,
    refetch,
    isError,
    isSuccess,
    isLoading,
  } = useFetchVideosQuery();
  const [selected, setSelected] = useState(-1);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (videos.length > 0) {
        setSelected(videos[0].id);
      }
    }
  }, [videos, isLoading, isSuccess]);
  return (
    <>
      <StudentNavbar />
      <section className='py-6 bg-primary'>
        <div className='mx-auto max-w-7xl px-5 lg:px-0'>
          <div className='grid grid-cols-3 gap-2 lg:gap-8'>
            {videos?.length > 0 ? (
              <>
                <Player selected={selected} user={user} />
                <CourseVideoList
                  selected={selected}
                  setSelected={setSelected}
                  videos={videos}
                  refetch={refetch}
                  isError={isError}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                />
              </>
            ) : (
              <Error
                message={'no video found. try to reload'}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
