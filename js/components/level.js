import AbstractView from "../abstract-view";
import PlayerView from './player';
import ArtistAnswerView from './artist-answer';
import GenreAnswerView from './genre-answer';
import {QuestionType} from "../loader";

/** @const INPUT_NAME - Имя поля для идентификации */
const INPUT_NAME = `answer`;

let nowPlaying = null;

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

  static getNowPlaying() {
    return nowPlaying;
  }

  static setNowPlaying(audio) {
    nowPlaying = audio;
  }

  // static deleteNowPlaying() {
  //   nowPlaying = null;
  // }

  // togglePlayers(player) {
  //   if (this._nowPlaying && this._nowPlaying !== player.audio) {
  //     this._nowPlaying.pause();
  //     this._nowPlaying.currentTime = 0;
  //     const btn = player.querySelector(`.player-control`);
  //     if (btn.classList.contains(`player-control--pause`)) {
  //       btn.classList.remove(`player-control--pause`);
  //       btn.classList.add(`player-control--play`);
  //     }
  //   }
  //   this._nowPlaying = player.audio;
  // }

  bind() {
    const form = this.element.querySelector(`form`);
    const variants = Array.from(this.question.variants);
    const loadedData = this.resources;
    const genreAnswers = [];
    const answerList = document.createDocumentFragment();
    variants.forEach((variant, id) => {
      let answer;
      if (this.question.type === QuestionType.ARTIST) {
        answer = new ArtistAnswerView(variant, id, INPUT_NAME, loadedData);
      } else {
        genreAnswers.push(new GenreAnswerView(variant, id, INPUT_NAME, loadedData));
        answer = new GenreAnswerView(variant, id, INPUT_NAME, loadedData);
      }
      console.log(answer);
      answerList.appendChild(answer.element);
    });

    form.insertBefore(answerList, form.firstChild);

    const inputs = Array.from(form[INPUT_NAME]);

    if (this.question.type === QuestionType.ARTIST) {

      const player = new PlayerView(loadedData.get(this.question.melody));
      this.element.insertBefore(player.element, form);
      player.play();

      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        player.stop();
        const answer = Number(evt.target.value);
        this.onAnswer(this.question, answer);
      }));

    } else if (this.question.type === QuestionType.GENRE) {
      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        form.querySelector(`.genre-answer-send`).disabled = !inputs.some((answer) => answer.checked);
      }));

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        genreAnswers.forEach((player) => player.stop());
        const answer = inputs.filter((i) => i.checked).map((i) => Number(i.value));
        this.onAnswer(this.question, answer);
      });
    }

    this.onLevelLoaded();
  }
}
