import {createElementFromString} from '../create-element';
import showScreen from "../show-screen";
import welcome from './screen-welcome';

const resultLoseTime = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const element = createElementFromString(resultLoseTime);

element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(welcome);
});

export default element;
