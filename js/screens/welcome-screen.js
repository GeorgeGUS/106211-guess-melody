import AbstractView from "../abstract-view";
import Application from "../application";

/**
 * Шаблон экрана приветствия
 */
export default class WelcomeScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
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
  }


  bind() {
    this.element.querySelector(`.main-play`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Application.showGame();
    });
  }
}
