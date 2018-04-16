import {currentState, result, questions, statistics} from "./data/data";
import {showScreen} from './utils';

import {calcScoring} from './data/scoring';

import resultScreen from './screens/screen-result';

import level from "./screens/screen-level";

/*
 * Обработка ответов пользователя
 * @param {string || Array} answer - Ответ пользователя в виде строки или массива
 */
export const processUserAnswer = (answer) => {
  if (typeof answer === `string`) {
    console.dir(answer);
    return;
  }
  console.dir(answer);

  if (currentState.question < questions.length - 1) {
    const currentQuestion = questions[++currentState.question];

    showScreen(level(currentQuestion));
  } else {
    showScreen(resultScreen(result.WIN, statistics, currentState.user));
  }
};
