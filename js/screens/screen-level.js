import {createElementFromString, getNumFromString} from '../utils';
import {processUserAnswer} from "../game-process";

import {currentState, melodies} from "../data/data";
import genreAnswer, {INPUT_NAME} from '../components/genre-answer';
import artistAnswer, {INPUT_NAME} from '../components/artist-answer';

import gameState from '../components/game-state';
import player from '../components/player';

export default (question) => {
  const levelArtist = `
  <section class="main main--level main--level-artist">
    <!--gameState-->
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <!--Player-->
      <form class="main-list">
        <!--Answers-->
      </form>
    </div>
  </section>`;

  const element = createElementFromString(levelArtist);
  element.insertBefore(gameState(currentState), element.firstChild);

  const form = element.querySelector(`form`);
  // Первая мелодия для примера
  element.querySelector(`.main-wrap`).insertBefore(player(melodies[question.answer]), form);

  // Временно выберем первые три мелодии для ответа
  melodies.slice(0, 3).forEach((artist, id) => {
    form.appendChild(artistAnswer(artist, id));
  });

  const inputs = Array.from(form[INPUT_NAME]);
  inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    const answer = getNumFromString(evt.target.value);
    processUserAnswer(answer);
    evt.target.checked = false;
  }));

  return element;
};
