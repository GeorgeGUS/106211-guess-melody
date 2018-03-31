import {createElementFromString} from '../create-element';
import showScreen from "../show-screen";
import win from "./screen-result-win";
import loseTime from "./screen-result-lose-time";
import loseAttempts from "./screen-result-lose-attempts";

const resultScreens = [win, loseTime, loseAttempts];

const levelGenre = `
  <section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

const element = createElementFromString(levelGenre);
const playerControls = element.querySelectorAll(`.player-control`);
const answers = element.querySelectorAll(`input[name="answer"]`);
const sendBtn = element.querySelector(`.genre-answer-send`);

/*
* Сброс состояния уровня
*/
const resetLevel = () => {
  // Кнопки отправки по умолчанию отключена
  sendBtn.disabled = true;

  // Сброс всех выбранных ответов
  Array.from(answers).forEach((answer) => {
    answer.checked = false;
  });
};

resetLevel();

Array.from(playerControls).forEach((btn) => btn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
}));

Array.from(answers).forEach((input) => input.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  // Кнопки отправки отключена, пока не выбран хоть один ответ
  sendBtn.disabled = !Array.from(answers).some((answer) => answer.checked);
}));

sendBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  // Результат определяется случайно
  const result = resultScreens[Math.floor(Math.random() * resultScreens.length)];
  showScreen(result);
  resetLevel();
});

export default element;
