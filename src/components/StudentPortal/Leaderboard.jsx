import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAssignmentMarksQuery } from '../../features/assignmentMarks/assignmentMarkApi';
import { useFetchQuizMarksQuery } from '../../features/quizMarks/quizMarkApi';
import StudentNavbar from './StudentNavbar';
import listOfFirstTwentyStudentForLeaderboard from '../../helpers/listOfFirstTwentyStudentForLeaderboard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import { selectUser } from '../../features/auth/authSelector';

export default function Leaderboard() {
  const user = useSelector(selectUser);
  const quizMarks = useSelector((state) => state.quizMark.allQuizMarks);
  const [userQuizMark, setUserQuizMark] = useState(0);
  const [userAssignmentMark, setUserAssignmentMark] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [currRanking, setCurrRaking] = useState(0);
  const {
    isLoading: quizMarksLoading,
    isSuccess: quizMarksSuccess,
    isError: quizMarksError,
    refetch: quizMarksRefetch,
  } = useFetchQuizMarksQuery();
  const {
    isLoading: assignmentMarksLoading,
    isSuccess: assignmentMarksSuccess,
    isError: assignmentMarksError,
    refetch: assignmentRefetch,
  } = useFetchAssignmentMarksQuery();

  const assignmentMarks = useSelector(
    (state) => state.assignmentMark.allAssignments
  );

  useEffect(() => {
    let userTotalQuizMark = 0;
    if (!quizMarksLoading && quizMarksSuccess) {
      const filterUser = quizMarks.filter(
        (q) => q.student_name === user.name && q.student_id === user.id
      );
      userTotalQuizMark = filterUser.reduce(
        (acc, currObject) => acc + currObject.mark,
        0
      );
    }
    setUserQuizMark(userTotalQuizMark);
  }, [quizMarksLoading, quizMarksSuccess, quizMarks, userQuizMark, user]);

  useEffect(() => {
    let userTotalAssignmentMark = 0;
    if (!assignmentMarksLoading && assignmentMarksSuccess) {
      const filterUser = assignmentMarks.filter(
        (q) => q.student_name === user.name && q.student_id === user.id
      );
      userTotalAssignmentMark = filterUser.reduce(
        (acc, currObject) => acc + currObject.mark,
        0
      );
    }
    setUserAssignmentMark(userTotalAssignmentMark);
  }, [assignmentMarksLoading, assignmentMarksSuccess, assignmentMarks, user]);
  useEffect(() => {
    let result;
    if (quizMarks !== undefined && assignmentMarks !== undefined) {
      result = listOfFirstTwentyStudentForLeaderboard(
        quizMarks,
        assignmentMarks
      );
    }
    setAllUsers(result);
    let currentUser = result.filter(
      (r) => r.student_id === user.id && r.student_name === user.name
    );
    setCurrRaking(currentUser[0]?.ranking);
  }, [assignmentMarks, quizMarks, user]);

  let content;
  if (quizMarksLoading || assignmentMarksLoading) {
    content = <Loading />;
  }
  if (quizMarksError) {
    content = (
      <Error
        message={'Error fetching quiz marks LeaderBoard scores'}
        refetch={quizMarksRefetch}
      />
    );
  }
  if (assignmentMarksError) {
    content = (
      <Error
        message={'Error fetching assignment marks LeaderBoard scores'}
        refetch={assignmentRefetch}
      />
    );
  }
  if (assignmentMarksSuccess && quizMarksSuccess) {
    content = (
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div>
          <h3 className='text-lg font-bold'>Your Position in Leaderboard</h3>
          <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
            <thead>
              <tr>
                <th className='table-th !text-center'>Rank</th>
                <th className='table-th !text-center'>Name</th>
                <th className='table-th !text-center'>Quiz Mark</th>
                <th className='table-th !text-center'>Assignment Mark</th>
                <th className='table-th !text-center'>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr className='border-2 border-cyan'>
                <td className='table-td text-center font-bold'>
                  {currRanking}
                </td>
                <td className='table-td text-center font-bold'>{user.name}</td>
                <td className='table-td text-center font-bold'>
                  {userQuizMark}
                </td>
                <td className='table-td text-center font-bold'>
                  {userAssignmentMark}
                </td>
                <td className='table-td text-center font-bold'>
                  {userQuizMark + userAssignmentMark}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='my-8'>
          <h3 className='text-lg font-bold'>Top 20 Result</h3>
          <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
            <thead>
              <tr className='border-b border-slate-600/50'>
                <th className='table-th !text-center'>Rank</th>
                <th className='table-th !text-center'>Name</th>
                <th className='table-th !text-center'>Quiz Mark</th>
                <th className='table-th !text-center'>Assignment Mark</th>
                <th className='table-th !text-center'>Total</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((user) => (
                <tr
                  key={user.student_id}
                  className='border-b border-slate-600/50'
                >
                  <td className='table-td text-center'>{user.ranking}</td>
                  <td className='table-td text-center'>{user.student_name}</td>
                  <td className='table-td text-center'>{user.quiz_mark_sum}</td>
                  <td className='table-td text-center'>
                    {user.assignment_mark_sum}
                  </td>
                  <td className='table-td text-center'>{user.combined_mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <>
      <StudentNavbar />
      <section className='py-6 bg-primary'>{content}</section>
    </>
  );
}
