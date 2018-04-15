import {createElementFromString} from '../utils';
import player from './player';
import {melodies} from "../data/data";

export const INPUT_NAME = `answer`;

export default (id) => {
  const genreAnswer = `
  <div class="genre-answer">
    <!--Player-->
    <input type="checkbox" name="${INPUT_NAME}" value="answer-${id}" id="a-${id}">
    <label class="genre-answer-check" for="a-${id}"></label>
  </div>`;

  const element = createElementFromString(genreAnswer);

  element.insertBefore(player(melodies[id]), element.firstChild);

  return element;
};
