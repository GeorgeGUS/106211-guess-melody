import {currentState, genres, initialState, result, questions, statistics} from "./data/data";
import {showScreen} from './utils';
import level from "./screens/screen-level-artist";

import {calcScoring} from './data/scoring';

import resultScreen from './screens/screen-result';
import genre from "./screens/screen-level-genre";


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
    showScreen(genre(questions[++currentState.question]));
  } else {
    showScreen(resultScreen(result.WIN, statistics, currentState.user));
  }
};
