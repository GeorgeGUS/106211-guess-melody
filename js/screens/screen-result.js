import {gameState, questions} from "../data/data";
import {createElementFromString, showScreen} from '../utils';
import {printResults} from '../data/results';
import level from "./screen-level";

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 * @param {Object} screenType - Тип экрана в случае победы или проигрыша
 * @param {Array} stats - Статистика результатов набранных баллов
 * @param {Object} result - Результат игрока
 * @return {Node}
 */
export default (screenType, stats, result) => {
  const stat = printResults(stats, result);
  const resultScreen = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${screenType.title[Math.floor(Math.random() * screenType.title.length)]}</h2>
    <div class="main-stat">${stat.result}</div>
    <span class="main-comparison">${stat.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${screenType.button}</span>
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
      restAttempts: 3,
      restTime: 300
    };
    showScreen(level(questions[gameState.question]));
  });

  return element;
};
