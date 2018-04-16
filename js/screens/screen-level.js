import {createElementFromString, getNumFromString} from '../utils';
import {processUserAnswer} from "../game-process";

import {INPUT_NAME, currentState, melodies, genres} from "../data/data";
import artistAnswer from '../components/artist-answer';
import genreAnswer from '../components/genre-answer';
import gameState from '../components/game-state';
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
    <!--gameState-->
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
  element.insertBefore(gameState(currentState), element.firstChild);
  const form = element.querySelector(`form`);
  const sendBtn = form.querySelector(`.genre-answer-send`);

  if (question.type === `artist`) {
    element.querySelector(`.main-wrap`).insertBefore(player(melodies[question.answer]), form);
  }

  const answersList = document.createDocumentFragment();
  question.variants.forEach((id) => {
    answersList.appendChild(question.type === `artist` ? artistAnswer(id) : genreAnswer(id));
  });
  form.appendChild(answersList);

  const inputs = Array.from(form[INPUT_NAME]);

  if (question.type === `artist`) {
    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const answer = getNumFromString(evt.target.value);
      processUserAnswer(answer);
      evt.target.checked = false;
    }));
  } else {
    form.appendChild(sendBtn);

    const resetLevel = () => {
      sendBtn.disabled = true;
      inputs.forEach((answer) => {
        answer.checked = false;
      });
    };
    resetLevel();

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      // Кнопка отправки отключена, пока не выбран хоть один ответ
      sendBtn.disabled = !inputs.some((answer) => answer.checked);
    }));

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const answer = inputs.filter((i) => i.checked).map((i) => getNumFromString(i.id));
      processUserAnswer(answer);
    });
  }

  return element;
};
