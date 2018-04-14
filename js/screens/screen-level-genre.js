import {createElementFromString, showScreen} from '../utils';
import resultScreen from './screen-result';

// import win from "./screen-result-win";
// import loseTime from "./screen-result-lose-time";
// import loseAttempts from "./screen-result-lose-attempts";

import gameState from '../components/game-state';
import genreAnswer, {INPUT_NAME} from '../components/genre-answer';

import {initialState, currentState, genres, melodies, result} from "../data/data";

const genre = `Rock`;

const levelGenre = `
  <section class="main main--level main--level-genre">
      <!--gameState-->
    <div class="main-wrap">
      <h2 class="title" align="center">Выберите все треки<br> в жанре ${genres[genre]}</h2>
      <form class="genre">      
        <!--Answers-->
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

const element = createElementFromString(levelGenre);
element.insertBefore(gameState(initialState), element.firstChild);
const form = element.querySelector(`form`);
const sendBtn = element.querySelector(`.genre-answer-send`);
const answers = createElementFromString(`<div></div>`);

// Для примера фильтруем мелодии по одному жанру (все ответы верные)
melodies.filter((q) => q.genre === genre).forEach((quest, id) => {
  answers.appendChild(genreAnswer(quest, id));
});
form.insertBefore(answers, form.firstChild);
const inputs = Array.from(form[INPUT_NAME]);

/*
* Сброс состояния уровня
*/
const resetLevel = () => {
  sendBtn.disabled = true;
  inputs.forEach((answer) => {
    answer.checked = false;
  });
};

resetLevel();

inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  // Кнопка отправки отключена, пока не выбран хоть один ответ
  sendBtn.disabled = !inputs.some((answer) => answer.checked);
}));


sendBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  // Временно показывается только экран выигрыша
  showScreen(resultScreen(result.WIN, currentState.user));
  resetLevel();
});

export default element;
