import AbstractView from "../abstract-view";
import PlayerView from './player';

/**
 * Шаблон вариантов мелодий по жанру
 */
export default class GenreAnswerView extends AbstractView {
  /** @constructor
   * @param {Object} variant - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(variant, id, inputName, resources) {
    super();
    this.id = id;
    this.inputName = inputName;
    this.player = new PlayerView(resources.get(variant.src)).element;
  }

  get template() {
    return `
    <div class="genre-answer">
      <!--PlayerView-->
      <input type="checkbox" name="${this.inputName}" value="${this.id}" id="a-${this.id}">
      <label class="genre-answer-check" for="a-${this.id}"></label>
    </div>`;
  }

  bind() {
    this.element.insertAdjacentElement(`afterbegin`, this.player);
  }
}
