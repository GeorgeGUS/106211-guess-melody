import {createElementFromString} from '../utils';
import {INPUT_NAME, melodies} from "../data/data";

/**
 * Шаблон вариантов ответов по артистам
 * @param {number} id - Номер мелодии из списка вопросов
 * @return {Node}
 */
export default (id) => {
  const melody = melodies[id];
  const artistAnswer = `
  <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${id}" name="${INPUT_NAME}" value="${id}"/>
    <label class="main-answer" for="answer-${id}">
      <img class="main-answer-preview" src="${melody.image}"
           alt="${melody.artist}" width="134" height="134">
      ${melody.artist}
    </label>
  </div>`;

  return createElementFromString(artistAnswer);
};

