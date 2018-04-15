import {currentState, genres, initialState, result, questions, statistics} from "./data/data";
import {showScreen} from './utils';
import {calcScoring} from './data/scoring';

import resultScreen from './screens/screen-result';



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

};

export const startGame = () => {

};
