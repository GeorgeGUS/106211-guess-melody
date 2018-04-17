import {createElementFromString} from '../utils';
import player from './player';
import {INPUT_NAME, melodies} from "../data/data";

export default (id) => {
  const genreAnswer = `
  <div class="genre-answer">
    <!--Player-->
    <input type="checkbox" name="${INPUT_NAME}" value="${melodies[id].genre}" id="a-${id}">
    <label class="genre-answer-check" for="a-${id}"></label>
  </div>`;

  const element = createElementFromString(genreAnswer);

  element.insertBefore(player(melodies[id]), element.firstChild);

  return element;
};
