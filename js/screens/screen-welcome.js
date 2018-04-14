import {createElementFromString, showScreen} from '../utils';
import artist from "./screen-level-artist";

const welcome = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

const element = createElementFromString(welcome);

element.querySelector(`.main-play`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(artist); // TODO: Заменить на функцию запуска вопросов
});

export default element;
