import { useGetSingleQuizQuery } from '../../../features/quizzes/quizApi';

import AdminNavbar from '../AdminNavbar';
import EditQuiztForm from './EditQuizForm';

export default function EditQuiz({ id }) {
  const { data: quiz, isSuccess } = useGetSingleQuizQuery(id);

  return (
    <div className='container relative'>
      <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
        <AdminNavbar />
        {isSuccess ? (
          <EditQuiztForm quiz={quiz} id={id} />
        ) : (
          <h3>No quiz exist with quizId of {id}</h3>
        )}
      </main>
    </div>
  );
}
