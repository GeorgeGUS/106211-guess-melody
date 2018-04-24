import AbstractView from "../abstract-view";
import Application from "../application";

/**
 * Шаблон экрана результата игры
 */
export default class ResultScreen extends AbstractView {
  /** @constructor
   * @param {Object} stats - Результат игрока
   */
  constructor(stats) {
    super();
    this.stats = stats;
  }

  get template() {
    return `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.stats.title}</h2>
    <div class="main-stat">${this.stats.message}</div>
    <span class="main-comparison">${this.stats.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${this.stats.button}</span>
  </section>`;
  }

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Application.showGame();
    });
  }
}
