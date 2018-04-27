import AbstractView from "../abstract-view";

/**
 * Шаблон вариантов ответов по артистам
 */
export default class ArtistAnswerView extends AbstractView {
  /** @constructor
   * @param {Array} melody - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(melody, id, inputName) {
    super();
    this.melody = melody;
    this.id = id;
    this.image = this.melody.image;
    this.inputName = inputName;
  }

  get template() {
    return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${this.id}" name="${this.inputName}" value="${this.id}"/>
      <label class="main-answer" for="answer-${this.id}">
        <img class="main-answer-preview" src="${this.image.url}"
             alt="${this.melody.artist}" width="${this.image.width}" height="${this.image.height}">
        ${this.melody.artist}
      </label>
    </div>`;
  }
}

