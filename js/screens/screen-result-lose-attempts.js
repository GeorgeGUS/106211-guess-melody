import {createElementFromString} from '../create-element';
import showScreen from "../show-screen";
import welcome from './screen-welcome';

const resultLoseAttempts = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const element = createElementFromString(resultLoseAttempts);

element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(welcome);
});

export default element;
