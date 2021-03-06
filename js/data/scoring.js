// Максимальное число попыток
const MAX_NUM_OF_ATTEMPTS = 3;
// Максимальное время на быстрый ответ
const MAX_FAST_ANSWER_TIME = 30;

/*
 * Подсчёт набранных баллов игрока
 * @param {Array} answers - Массив ответов пользователя
 * @param {number} restAttempts - Количество оставшихся нот
 * @return {number} - Количество набранных очков
 */
export const calcScoring = (answers, restAttempts) => {
  const falseAnswers = answers.filter((a) => !a.success).length;

  if (falseAnswers !== MAX_NUM_OF_ATTEMPTS - restAttempts) {
    throw new Error(`Wrong answers (${falseAnswers}) don't match the rest of the notes
    (${MAX_NUM_OF_ATTEMPTS - restAttempts})`);
  }

  const isAttemptsOver = restAttempts === 0 || falseAnswers === MAX_NUM_OF_ATTEMPTS;

  if (isAttemptsOver) {
    return null;
  }

  return answers.reduce((acc, current) => {
    if (current.success) {
      return current.time < MAX_FAST_ANSWER_TIME ? acc + 2 : acc + 1;
    }
    return acc - 2;
  }, 0);
};
