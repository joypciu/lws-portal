
import { useFetchAssignmentMarksQuery } from '../../../features/assignmentMarks/assignmentMarkApi';
import AdminNavbar from '../AdminNavbar';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import { useSelector } from 'react-redux';
import SingleAssignmentMark from './SingleAssignmentMark';
export default function AssignmentMark() {
  const marks = useSelector((state) => state.assignmentMark);
  const {
    data: assignmentMarks,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useFetchAssignmentMarksQuery();

  let content;
  if (isLoading && !isSuccess) {
    content = <Loading />;
  }
  if (isSuccess && assignmentMarks.length > 0) {
    content = (
      <table className='divide-y-1 text-base divide-gray-600 w-full'>
        <thead>
          <tr>
            <th className='table-th'>Assignment</th>
            <th className='table-th'>Date</th>
            <th className='table-th'>Student Name</th>
            <th className='table-th'>Repo Link</th>
            <th className='table-th'>Mark</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-600/50'>
          {assignmentMarks.map((assignmentMark) => (
            <SingleAssignmentMark
              key={assignmentMark.id}
              assignmentMark={assignmentMark}
            />
          ))}
        </tbody>
      </table>
    );
  }
  if (isSuccess && assignmentMarks.length === 0) {
    content = <h3>no user submitted any assignment to get mark</h3>;
  }
  if (isError) {
    content = (
      <Error message={'Error fetching assignment marks'} refetch={refetch} />
    );
  }
  return (
    <>
      <AdminNavbar />
      <section className='py-6 bg-primary'>
        <div className='mx-auto max-w-full px-5 lg:px-20'>
          <div className='px-3 py-20 bg-opacity-10'>
            <ul className='assignment-status'>
              <li>
                Total <span>{marks?.total}</span>
              </li>
              <li>
                Pending <span>{marks?.pending}</span>
              </li>
              <li>
                Mark Sent <span>{marks?.mark_sent}</span>
              </li>
            </ul>
            <div className='overflow-x-auto mt-4'>{content}</div>
          </div>
        </div>
      </section>
    </>
  );
}
