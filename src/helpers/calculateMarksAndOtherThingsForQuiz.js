export default function calculateMarksAndOtherThingsForQuiz(
  currQuiz,
  selectedAnswers
) {
  let marks = 0;
  let total_correct = 0;
  let total_wrong = 0;
  let userDidNotSelectAnyOption = 0;

  for (let i = 0; i < currQuiz.length; i++) {
    let selected = [];
    let correctAnswer = 0;
    let isSelected = false;
    for (let j = 0; j < currQuiz[i].options.length; j++) {
      if (currQuiz[i].options[j].isCorrect) {
        correctAnswer = correctAnswer + 1;
      }
      if (
        selectedAnswers[`${i + 1}${j + 1}`] ===
          currQuiz[i].options[j].isCorrect.toString() &&
        currQuiz[i].options[j].isCorrect
      ) {
        selected.push(currQuiz[i].options[j]);
        isSelected = true;
      }
      if (
        selectedAnswers[`${i + 1}${j + 1}`] ===
          currQuiz[i].options[j].isCorrect.toString() &&
        !currQuiz[i].options[j].isCorrect
      ) {
        total_wrong = total_wrong + 1;
        isSelected = true;
        selected = null;
        break;
      }
    }
    if (selected == null) {
      marks = 0;
    }

    if (selected && selected.length === correctAnswer) {
      total_correct = total_correct + 1;
      marks = marks + 5;
    }

    if (!isSelected) {
      userDidNotSelectAnyOption = userDidNotSelectAnyOption + 1;
    } else if (selected && selected.length !== correctAnswer) {
      total_wrong = total_wrong + 1;
    }
  }

  total_wrong = total_wrong + userDidNotSelectAnyOption;

  return { total_correct, total_wrong, marks };
}
