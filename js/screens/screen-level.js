/* eslint-disable no-console */
import {createElementFromString} from '../utils';
import {processUserAnswer} from "../game-process";

import {INPUT_NAME, gameState, melodies, genres} from "../data/data";
import artistAnswer from '../components/artist-answer';
import genreAnswer from '../components/genre-answer';
import levelState from '../components/level-state';
import player from '../components/player';

export default (question) => {
  let title = `<h2 class="title main-title">Кто исполняет эту песню?</h2>`;
  let formClass = `main-list`;
  let btn = ``;


  if (question.type === `genre`) {
    title = `<h2 class="title" align="center">Выберите все треки<br> в жанре ${genres[question.answer]}</h2>`;
    formClass = `genre`;
    btn = `<button class="genre-answer-send" type="submit">Ответить</button>`;
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

    element.querySelector(`.main-wrap`).insertBefore(player(melodies[question.answer]), form);

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const answer = Number(evt.target.value);
      processUserAnswer(question, answer);
      evt.target.checked = false;
    }));

  } else if (question.type === `genre`) {
    // Подсказка ;)
    const rightAnswers = [...question.variants].filter((i) => melodies[i].genre === question.answer).map((i) => [...question.variants].indexOf(i) + 1).join(`, `);
    console.log(`Правильные ответы: ${rightAnswers}`);

    form.appendChild(sendBtn);

    sendBtn.disabled = true;
    inputs.forEach((answer) => {
      answer.checked = false;
    });

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      // Кнопка отправки отключена, пока не выбран хоть один ответ
      sendBtn.disabled = !inputs.some((answer) => answer.checked);
    }));

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const answer = inputs.filter((i) => i.checked).map((i) => i.value);
      processUserAnswer(question, answer);
    });
  }

  return element;
};
