import AbstractView from "../abstract-view";

/**
 * Шаблон экрана загрузки
 */
export default class ErrorScreen extends AbstractView {
  constructor(message) {
    super();
    this.message = message;
  }

  get template() {
    return `
  <section class="main">
    <div class="title title--error">${this.message}</div>
  </section>`;
  }
}
