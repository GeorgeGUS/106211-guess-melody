import {initialState, numerals} from "./data";
import {declOfNum} from "../utils";

/**
 * Получение результов игрока
 * @param {Array} allUserResults - Массив результатов игр других игроков
 * @param {number} points - количество заработанных очков
 * @return {Array} - Массив с результами игрока
 */
export const getResults = (allUserResults, points) => {
  const stats = [...allUserResults];
  stats.push(points);
  stats.sort((a, b) => a - b);

  const userCount = stats.length;
  const userPosition = userCount - stats.indexOf(points);
  const userPercent = Math.round((userCount - userPosition) / userCount * 100);

  return [userPosition, userCount, userPercent];
};

/**
 * Вывод сообщения со статистикой игрока
 * @param {Object} result - Объект результата игрока
 * @return {string} - Сообщение о результате игрока
 */
const createResultMessage = (result) => {
  const userTime = initialState.time - result.restTime;
  const minutes = declOfNum(Math.floor(userTime / 60), numerals.minutes);
  const seconds = declOfNum(Math.floor(userTime % 60), numerals.seconds);
  const points = declOfNum(result.points, numerals.points);
  const fastPoints = declOfNum(result.fastPoints, numerals.fastPoints);
  const mistakes = declOfNum(initialState.attempts - result.restNotes, numerals.mistakes);

  return `За&nbsp;${minutes} и ${seconds}
      <br>вы&nbsp;набрали ${points} (${fastPoints}),
      <br>совершив ${mistakes}`;
};

/**
 * Вывод сообщения с результами игрока
 * @param {Array} allUserResults - Массив результатов игр других игроков
 * @param {Object} userResult - Объект результата игрока
 * @param {number} userResult.points - количество заработанных очков
 * @param {number} userResult.restNotes - оставшееся количество попыток
 * @param {number} userResult.restTime - оставшееся количество времени
 * @return {string} - Сообщение о результате игрока
 */
export const printResults = (allUserResults, userResult) => {
  if (userResult.restNotes === 0) {
    return {
      result: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
      comparison: ``
    };
  }

  if (userResult.restTime === 0) {
    return {
      result: `Время вышло! Вы не успели отгадать все мелодии.`,
      comparison: ``
    };
  }

  const [position, total, percent] = getResults(allUserResults, userResult.points);

  return {
    result: createResultMessage(userResult),
    comparison: `Вы заняли ${position}-ое место из ${total}. Это лучше чем у ${percent}% игроков.`
  };
};
