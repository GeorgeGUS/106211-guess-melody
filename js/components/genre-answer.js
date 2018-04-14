import {createElementFromString} from '../utils';
import player from './player';

export const INPUT_NAME = `answer`;

export default (melody, id) => {
  const genreAnswer = `
  <div class="genre-answer">
    <!--Player-->
    <input type="checkbox" name="${INPUT_NAME}" value="answer-${id}" id="a-${id}">
    <label class="genre-answer-check" for="a-${id}"></label>
  </div>`;

  const element = createElementFromString(genreAnswer);

  element.insertBefore(player(melody), element.firstChild);

  return element;
};
