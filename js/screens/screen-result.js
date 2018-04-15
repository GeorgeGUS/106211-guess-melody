import {createElementFromString, showScreen} from '../utils';

import {printResults} from '../data/results';

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
    // showScreen(welcome); // TODO: Заменить на функцию сброса состояния с переходом на экран приветствия
    // startGame();
  });

  return element;
};
