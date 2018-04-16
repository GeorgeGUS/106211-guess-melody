import {createElementFromString, showScreen} from '../utils';

import {printResults} from '../data/results';
import {currentState, initialState, questions} from "../data/data";
import level from "./screen-level";

export default (screen, stats, result) => {
  const stat = printResults(stats, result);
  const resultScreen = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${screen.title}</h2>
    <div class="main-stat">${stat.result}</div>
    <span class="main-comparison">${stat.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${screen.button}</span>
  </section>`;

  const element = createElementFromString(resultScreen);

  element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    currentState.question = 0;
    showScreen(level(questions[initialState.question]));
  });

  return element;
};
