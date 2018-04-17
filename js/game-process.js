import {gameState, result, questions, statistics, melodies} from "./data/data";
import {showScreen} from './utils';

import {calcScoring} from './data/scoring';

import resultScreen from './screens/screen-result';

import level from "./screens/screen-level";

/*
 * Обработка ответов пользователя
 * @param {string || Array} answer - Ответ пользователя в виде строки или массива
 */
export const processUserAnswer = (question, answer) => {
  let verdict = false;
  if (question.type === `artist`) {
    verdict = answer === question.answer;
  } else {
    const rightAnswersLength = [...question.variants].filter((i) => melodies[i].genre === question.answer).length;
    verdict = answer.every((a) => a === question.answer) && rightAnswersLength === answer.length;
  }
  // Временно поставим рандомное время для теста
  gameState.answers.push({success: verdict, time: Math.floor(Math.random() * 60)});

  if (!verdict && gameState.user.restNotes >= 0) {
    gameState.user.restNotes--;
  }
  gameState.user.points = calcScoring(gameState.answers, gameState.user.restNotes);

  if (gameState.user.points === null) {
    showScreen(resultScreen(result.LOSE, statistics, gameState.user));
  } else if (gameState.question < questions.length - 1) {
    const currentQuestion = questions[++gameState.question];
    showScreen(level(currentQuestion));
  } else {
    showScreen(resultScreen(result.WIN, statistics, gameState.user));
  }
};
