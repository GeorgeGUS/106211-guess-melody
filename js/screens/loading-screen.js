import AbstractView from "../abstract-view";

/**
 * Шаблон экрана загрузки
 */
export default class LoadingScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <section class="main">
    <h2 class="title title--loading">Сейчас всё загрузится и мы начнём...</h2>
    <div class="spinner"></div>
  </section>`;
  }
}
