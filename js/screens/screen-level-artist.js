import {createElementFromString, getNumFromString, showScreen} from '../utils';
import {processUserAnswer} from "../game-process";

import {currentState, melodies} from "../data/data";
import artistAnswer, {INPUT_NAME} from '../components/artist-answer';

import gameState from '../components/game-state';
import player from '../components/player';
import genreAnswer from "../components/genre-answer";

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

  const answersList = document.createDocumentFragment();
  question.variants.forEach((id) => {
    answersList.appendChild(artistAnswer(id));
  });
  form.appendChild(answersList);

  const inputs = Array.from(form[INPUT_NAME]);
  inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    const answer = getNumFromString(evt.target.value);
    processUserAnswer(answer);
    evt.target.checked = false;
  }));

  return element;
};
