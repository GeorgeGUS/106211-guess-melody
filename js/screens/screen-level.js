// Временно разрешил использование console.log для подсказок ответов на вопросы
/* eslint-disable no-console */
import {INPUT_NAME, gameState, melodies, genres} from "../data/data";
import {createElementFromString} from '../utils';
import {processUserAnswer} from "../game-process";
import artistAnswer from '../components/artist-answer';
import genreAnswer from '../components/genre-answer';
import levelState from '../components/level-state';
import player from '../components/player';

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 * @param {Object} question - Текущий вопрос
 * @return {Node}
 */
export default (question) => {
  let title = `<h2 class="title main-title">Кто исполняет эту песню?</h2>`;
  let formClass = `main-list`;
  let btn = ``;

  if (question.type === `genre`) {
    title = `<h2 class="title" align="center">Выберите все треки<br> в жанре ${genres[question.answer]}</h2>`;
    formClass = `genre`;
    btn = `<button class="genre-answer-send" type="submit" disabled>Ответить</button>`;
  }

  const level = `
  <section class="main main--level main--level-artist">
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

  const element = createElementFromString(level);
  element.insertBefore(levelState(gameState), element.firstChild);
  const form = element.querySelector(`form`);
  const sendBtn = form.querySelector(`.genre-answer-send`);

  const answersList = document.createDocumentFragment();
  question.variants.forEach((id) => {
    answersList.appendChild(question.type === `artist` ? artistAnswer(id) : genreAnswer(id));
  });
  form.appendChild(answersList);

  const inputs = Array.from(form[INPUT_NAME]);

  if (question.type === `artist`) {
    // Подсказка ;)
    console.log(`Правильный ответ: ${melodies[question.answer].artist}`);

    element.querySelector(`.main-wrap`).insertBefore(player(melodies[question.answer], `autoplay`), form);

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const answer = Number(evt.target.value);
      processUserAnswer(question, answer);
    }));

  } else {
    // Подсказка ;)
    const rightAnswers = Array.from(question.variants).filter((i) => melodies[i].genre === question.answer).map((i) => Array.from(question.variants).indexOf(i) + 1).join(`, `);
    console.log(`Правильные ответы: ${rightAnswers}`);

    form.appendChild(sendBtn);

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      // Кнопка отправки отключена, пока не выбран хоть один ответ
      sendBtn.disabled = !inputs.some((answer) => answer.checked);
    }));

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const answer = inputs.filter((i) => i.checked).map((i) => Number(i.value));
      processUserAnswer(question, answer);
    });
  }

  return element;
};
