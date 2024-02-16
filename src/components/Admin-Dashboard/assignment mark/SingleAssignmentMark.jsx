import { useState } from 'react';
import { useEditAssignmentMarkMutation } from '../../../features/assignmentMarks/assignmentMarkApi';

export default function SingleAssignmentMark({ assignmentMark }) {
  const [input, setInput] = useState(0);
  const [editAssignmentMark] = useEditAssignmentMarkMutation();
  function handleInputChange(e) {
    setInput(e.target.value);
  }
  function handleClick(e) {
    let givenMark = Number(input);
    if (givenMark > assignmentMark.totalMark) {
      alert(
        `insert marks smaller or equal to total marks ${assignmentMark.totalMark} ( for current assignemnt )`
      );
    } else {
      let id = assignmentMark.id;
      const data = {
        ...assignmentMark,
        status: 'published',
        mark: givenMark,
      };
      editAssignmentMark({ id, data });
    }
  }
  return (
    <tr key={assignmentMark.id}>
      <td className='table-td'>{assignmentMark.title}</td>
      <td className='table-td'>10 Mar 2023 10:58:13 PM</td>
      <td className='table-td'>{assignmentMark.student_name}</td>
      <td className='table-td'>{assignmentMark.repo_link}</td>
      {assignmentMark.status === 'pending' ? (
        <td className='table-td input-mark'>
          <input
            max={assignmentMark.totalMark}
            min={0}
            value={input}
            onChange={handleInputChange}
          />
          <button onClick={handleClick}>
            <svg
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.5 12.75l6 6 9-13.5'
              />
            </svg>
          </button>
        </td>
      ) : (
        <td className='table-td'>{assignmentMark.mark}</td>
      )}
    </tr>
  );
}
