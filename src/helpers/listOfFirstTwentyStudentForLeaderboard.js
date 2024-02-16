export default function listOfFirstTwentyStudentForLeaderboard(
  quizMark,
  assignmentMark
) {
  // Step 1: Merge the "quizMark" and "assignmentMark" arrays
  let mergedMarks = [...quizMark, ...assignmentMark];
  // Step 2: Calculate the combined mark for each student
  mergedMarks = mergedMarks.reduce((acc, currStudent) => {
    const existingMark = acc.find(
      (m) => m.student_id === currStudent.student_id
    );
    if (existingMark) {
      existingMark.mark += currStudent.mark;
      if (currStudent.video_id) {
        existingMark.quiz_mark_sum += currStudent.mark;
      } else {
        existingMark.assignment_mark_sum += currStudent.mark;
      }
    } else {
      acc.push({
        student_id: currStudent.student_id,
        student_name: currStudent.student_name,
        mark: currStudent.mark,
        quiz_mark_sum: currStudent.video_id ? currStudent.mark : 0,
        assignment_mark_sum: currStudent.video_id ? 0 : currStudent.mark,
      });
    }
    return acc;
  }, []);

  mergedMarks = mergedMarks.map((mark) => ({
    student_id: mark.student_id,
    student_name: mark.student_name,
    combined_mark: mark.mark,
    quiz_mark_sum: mark.quiz_mark_sum,
    assignment_mark_sum: mark.assignment_mark_sum,
  }));

  // Step 3: Sort the array of objects by the combined mark in descending order
  mergedMarks.sort((a, b) => b.combined_mark - a.combined_mark);
  // Step 4: Add the ranking property to each object
  let rank = 1;
  mergedMarks.forEach((mark, index) => {
    if (
      index > 0 &&
      mark.combined_mark < mergedMarks[index - 1].combined_mark
    ) {
      rank++;
    }
    mark.ranking = rank;
  });
  // Step 4: Extract the first 20 objects from the sorted array
  const top20 = mergedMarks.slice(0, 20);
  return top20;
}
