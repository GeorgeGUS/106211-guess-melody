import AbstractView from "../abstract-view";
import Player from '../components/player';
import ArtistAnswer from '../components/artist-answer';
import GenreAnswer from '../components/genre-answer';

/** @enum Genres - Ассоциация жанра с его описанием */
const Genres = {
  'Rock': `инди-рок`,
  'Jazz': `джаз`,
  'Country': `кантри`,
  'Pop': `поп-музыка`,
  'Folk': `фолк`,
  'R&B': `R&B`,
  'Electronic': `электронная музыка`
};
/** @const INPUT_NAME - Имя поля для идентификации */
const INPUT_NAME = `answer`;

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 */
export default class LevelScreen extends AbstractView {
  /** @constructor
   * @param {Object} melodies - Список мелодий с сервера
   * @param {Object} question - Текущий вопрос
   * @param {Object} levelState - Текущee состояние игры
   */
  constructor(melodies, question, levelState) {
    super();
    this.melodies = melodies;
    this.question = question;
    this.levelState = levelState;
  }

  get template() {
    let title = `<h2 class="title main-title">Кто исполняет эту песню?</h2>`;
    let formClass = `main-list`;
    let btn = ``;

    if (this.question.type === `genre`) {
      title = `<h2 class="title" align="center">Выберите все треки<br> в жанре ${Genres[this.question.answer]}</h2>`;
      formClass = `genre`;
      btn = `<button class="genre-answer-send" type="submit" disabled>Ответить</button>`;
    }

    return `
    <section class="main main--level main--level-${this.question.type}">
      <!--levelState-->      
      <div class="main-wrap">
        ${title}
        <!--Player-->
        <form class="${formClass}">
          <!--Answers-->
          ${btn}
        </form>
      </div>
    </section>`;
  }

  onAnswer() {}

  bind() {
    this.element.insertAdjacentElement(`afterbegin`, this.levelState.element);
    const form = this.element.querySelector(`form`);
    const variants = Array.from(this.question.variants);
    const answerList = document.createDocumentFragment();
    for (const id of variants) {
      answerList.appendChild(this.question.type === `artist` ? new ArtistAnswer(this.melodies, id, INPUT_NAME).element : new GenreAnswer(this.melodies, id, INPUT_NAME).element);
    }

    form.insertBefore(answerList, form.firstChild);

    const inputs = Array.from(form[INPUT_NAME]);

    if (this.question.type === `artist`) {
      this.element.querySelector(`.main-wrap`).insertBefore(new Player(this.melodies[this.question.answer], `autoplay`).element, form);

      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const answer = Number(evt.target.value);
        this.onAnswer(this.question, answer);
      }));

    } else {
      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        // Кнопка отправки отключена, пока не выбран хоть один ответ
        form.querySelector(`.genre-answer-send`).disabled = !inputs.some((answer) => answer.checked);
      }));

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const answer = inputs.filter((i) => i.checked).map((i) => Number(i.value));
        this.onAnswer(this.question, answer);
      });
    }
  }
}
