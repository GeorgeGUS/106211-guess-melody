// Максимальное число попыток
const MAX_NUM_OF_ATTEMPTS = 3;
// Количество вопросов
const NUM_OF_QUESTIONS = 10;
// Максимальное время на быстрый ответ
const MAX_FAST_ANSWER_TIME = 30;

/*
 * Подсчёт набранных баллов игрока
 * @param {Array} answers - Массив ответов пользователя
 * @param {number} restNotes - Количество оставшихся нот
 * @return {number} scoring - Количество набранных очков
 */
export const calcScoring = (answers, restNotes) => {
  let scoring = 0;
  let falseAnswers = answers.filter((a) => !a.success).length;
  if (falseAnswers !== MAX_NUM_OF_ATTEMPTS - restNotes) {
    throw new Error(`Wrong answers don't match the rest of the notes`);
  }
  if (restNotes === 0 || answers.length < NUM_OF_QUESTIONS) {
    scoring = -1;
  } else {
    scoring = answers.reduce((prevAnswer, nextAnswer) => {
      if (nextAnswer.success && nextAnswer.time < MAX_FAST_ANSWER_TIME) {
        prevAnswer += 2;
      } else if (nextAnswer.success) {
        prevAnswer += 1;
      } else {
        prevAnswer += -2;
      }
      return prevAnswer;
    }, 0);
  }

  return scoring;
};
