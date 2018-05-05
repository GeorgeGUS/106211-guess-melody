import AbstractView from "../abstract-view";

/**
 * Шаблон вариантов ответов по артистам
 */
export default class ArtistAnswerView extends AbstractView {
  /** @constructor
   * @param {Object} variant - один из вариантов текущего вопроса
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(variant, id, inputName, resources) {
    super();
    this.variant = variant;
    this.id = id;
    this.image = this.variant.image;
    this.inputName = inputName;
  }

  get template() {
    return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${this.id}" name="${this.inputName}" value="${this.id}"/>
      <label class="main-answer" for="answer-${this.id}">
        <img class="main-answer-preview" src="${this.image.url}"
             alt="${this.variant.artist}" width="${this.image.width}" height="${this.image.height}">
        ${this.variant.artist}
      </label>
    </div>`;
  }
}

