import AbstractView from "../abstract-view";

/**
 * Шаблон вариантов ответов по артистам
 */
export default class ArtistAnswerView extends AbstractView {
  /** @constructor
   * @param {Array} melodies - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(melodies, id, inputName) {
    super();
    this.id = id;
    this.inputName = inputName;
    this.melody = melodies[id];
  }

  get template() {
    return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${this.id}" name="${this.inputName}" value="${this.id}"/>
      <label class="main-answer" for="answer-${this.id}">
        <img class="main-answer-preview" src="${this.melody.image}"
             alt="${this.melody.artist}" width="134" height="134">
        ${this.melody.artist}
      </label>
    </div>`;
  }
}

