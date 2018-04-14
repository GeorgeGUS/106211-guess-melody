import {createElementFromString, showScreen} from '../utils';
import genre from "./screen-level-genre";

import {initialState, melodies} from "../data/data";
import artistAnswer, {INPUT_NAME} from '../components/artist-answer';

import gameState from '../components/game-state';
import player from '../components/player';

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
element.insertBefore(gameState(initialState), element.firstChild);

const form = element.querySelector(`form`);
// Первая мелодия для примера
element.querySelector(`.main-wrap`).insertBefore(player(melodies[0]), form);

// Временно выберем первые три мелодии для ответа
melodies.slice(0, 3).forEach((artist, id) => {
  form.appendChild(artistAnswer(artist, id));
});

const inputs = Array.from(form[INPUT_NAME]);
inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  showScreen(genre);
  evt.target.checked = false;
}));

export default element;
