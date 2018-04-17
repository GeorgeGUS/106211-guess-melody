import {createElementFromString, showScreen} from '../utils';

import {printResults} from '../data/results';
import {gameState, questions} from "../data/data";
import level from "./screen-level";

export default (screen, stats, result) => {
  const stat = printResults(stats, result);
  const resultScreen = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${screen.title[Math.floor(Math.random() * screen.title.length)]}</h2>
    <div class="main-stat">${stat.result}</div>
    <span class="main-comparison">${stat.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${screen.button}</span>
  </section>`;

  const element = createElementFromString(resultScreen);

  element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    // Пока что сброс стейта делается так
    gameState.question = 0;
    gameState.answers = [];
    gameState.user = {
      points: 0,
      fastPoints: 0,
      restNotes: 3,
      restTime: 300
    };
    showScreen(level(questions[gameState.question]));
  });

  return element;
};
