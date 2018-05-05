import AbstractView from "../abstract-view";
import PlayerView from './player';
import ArtistAnswerView from './artist-answer';
import GenreAnswerView from './genre-answer';
import {QuestionType} from "../loader";

/** @const INPUT_NAME - Имя поля для идентификации */
const INPUT_NAME = `answer`;

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 */
export default class LevelView extends AbstractView {
  /** @constructor
   * @param {Object} question - Текущий вопрос
   * @param {string} progress - Показатель прогресса
   * @param {Array} resources - Загруженные ресурсы
   */
  constructor(question, progress, resources) {
    super();
    this.question = question;
    this.resources = resources;
    this.progress = progress;
    this._nowPlaying = null;
  }

  get template() {
    let titleClass = `main-title`;
    let formClass = `main-list`;
    let btn = ``;

    if (this.question.type === QuestionType.GENRE) {
      titleClass = ``;
      formClass = `genre`;
      btn = `<button class="genre-answer-send" type="submit" disabled>Ответить</button>`;
    }

    return `   
      <div class="main-wrap">
        <div class="progress">${this.progress}</div>
        <h2 class="title ${titleClass}">${this.question.title}</h2>
        <!--PlayerView-->
        <form class="${formClass}">
          <!--Answers-->
          ${btn}
        </form>
      </div>`;
  }

  onAnswer() {}

  onLevelLoaded() {}

  togglePlayers(evt) {
    if (this._nowPlaying && this._nowPlaying !== evt.target) {
      this._nowPlaying.pause();
      this._nowPlaying.currentTime = 0;
      const btn = this._nowPlaying.parentNode.querySelector(`.player-control`);
      if (btn.classList.contains(`player-control--pause`)) {
        btn.classList.remove(`player-control--pause`);
        btn.classList.add(`player-control--play`);
      }
    }
    this._nowPlaying = evt.target;
  }

  bind() {
    const form = this.element.querySelector(`form`);
    const variants = Array.from(this.question.variants);
    const loadedData = this.resources;
    const answerList = document.createDocumentFragment();
    variants.forEach((variant, id) => {
      answerList.appendChild(this.question.type === QuestionType.ARTIST ?
        new ArtistAnswerView(variant, id, INPUT_NAME, loadedData).element
        :
        new GenreAnswerView(variant, id, INPUT_NAME, loadedData).element);
    });

    form.insertBefore(answerList, form.firstChild);

    const inputs = Array.from(form[INPUT_NAME]);

    if (this.question.type === QuestionType.ARTIST) {
      // const player = new PlayerView(this.question.melody, `autoplay`).element;
      const player = new PlayerView(loadedData.get(this.question.melody), `autoplay`).element;
      this.element.insertBefore(player, form);

      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const answer = Number(evt.target.value);
        this.onAnswer(this.question, answer);
      }));

    } else if (this.question.type === QuestionType.GENRE) {
      const firstPlayer = form.firstChild;
      firstPlayer.querySelector(`audio`).setAttribute(`autoplay`, ``);
      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        form.querySelector(`.genre-answer-send`).disabled = !inputs.some((answer) => answer.checked);
      }));

      form.addEventListener(`playing`, this.togglePlayers, true);
      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const answer = inputs.filter((i) => i.checked).map((i) => Number(i.value));
        this.onAnswer(this.question, answer);
      });
    }

    this.onLevelLoaded();
  }
}
