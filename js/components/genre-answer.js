import {createElementFromString} from '../utils';
import {INPUT_NAME, melodies} from "../data/data";
import player from './player';

/**
 * Шаблон вариантов мелодий по жанру
 * @param {number} id - Номер мелодии из списка вопросов
 * @return {Node}
 */
export default (id) => {
  const genreAnswer = `
  <div class="genre-answer">
    <!--Player-->
    <input type="checkbox" name="${INPUT_NAME}" value="${id}" id="a-${id}">
    <label class="genre-answer-check" for="a-${id}"></label>
  </div>`;

  const element = createElementFromString(genreAnswer);

  element.insertBefore(player(melodies[id]), element.firstChild);

  return element;
};
