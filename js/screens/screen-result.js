import AbstractView from "../abstract-view";

/**
 * Шаблон экрана результата игры
 */
export default class ResultScreen extends AbstractView {
  /** @constructor
   * @param {Object} screenType - Тип экрана в случае победы или проигрыша
   * @param {Object} stats - Результат игрока
   */
  constructor(screenType, stats) {
    super();
    this.screenType = screenType;
    this.stats = stats;
    this.title = this.screenType.titles[Math.floor(Math.random() * this.screenType.titles.length)];
  }

  get template() {
    return `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.title}</h2>
    <div class="main-stat">${this.stats.message}</div>
    <span class="main-comparison">${this.stats.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${this.screenType.button}</span>
  </section>`;
  }

  onRestartClick() {}

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onRestartClick();
    });
  }
}
