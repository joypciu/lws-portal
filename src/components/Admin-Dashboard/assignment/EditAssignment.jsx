import { useGetSingleAssignmentQuery } from '../../../features/adminAssignments/adminAssignemntApi';

import AdminNavbar from '../AdminNavbar';
import EditAssignmentForm from './EditAssignmentForm';

export default function EditAssignment({ id }) {
  const { data: assignment, isSuccess } = useGetSingleAssignmentQuery(id);

  return (
    <div className='container relative'>
      <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
        <AdminNavbar />
        <h1 className='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>
          Edit Assignment
        </h1>

        {isSuccess ? (
          <EditAssignmentForm assignment={assignment} id={id} />
        ) : (
          <h3>No assignment exist with assignmentId of {id}</h3>
        )}
      </main>
    </div>
  );
}
