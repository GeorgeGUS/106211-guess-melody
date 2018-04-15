import {createElementFromString, getNumFromString} from '../utils';
import {processUserAnswer} from "../game-process";

import gameState from '../components/game-state';
import genreAnswer, {INPUT_NAME} from '../components/genre-answer';

import {genres} from "../data/data";

export default (question, state) => {
  const levelGenre = `
  <section class="main main--level main--level-genre">
      <!--gameState-->
    <div class="main-wrap">
      <h2 class="title" align="center">Выберите все треки<br> в жанре ${genres[question.answer]}</h2>
      <form class="genre">
        <!--Answers-->
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

  const element = createElementFromString(levelGenre);
  element.insertBefore(gameState(state), element.firstChild);
  const form = element.querySelector(`form`);
  const sendBtn = form.querySelector(`.genre-answer-send`);

  const answersList = document.createDocumentFragment();
  question.variants.forEach((id) => {
    answersList.appendChild(genreAnswer(id));
  });
  form.insertBefore(answersList, sendBtn);

  const inputs = Array.from(form[INPUT_NAME]);

  /*
  * Сброс состояния уровня
  */
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


  // sendBtn.addEventListener(`click`, (evt) => {
  //   evt.preventDefault();
  //   // Временно показывается только экран выигрыша
  //   showScreen(resultScreen(result.WIN, currentState.user));
  //   resetLevel();
  // });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const answer = inputs.filter((i) => i.checked).map((i) => getNumFromString(i.id));
    processUserAnswer(answer);
  });

  return element;
};
