import {createElementFromString} from '../utils';

export default (melody) => {
  const player = `
  <div class="player-wrapper">
    <div class="player">
      <audio src="${melody.src}"></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;

  const element = createElementFromString(player);
  const audio = element.querySelector(`audio`);
  const playerBtn = element.querySelector(`.player-control`);


  const playerBtnHolder = (evt) => {
    evt.preventDefault();
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0; // Сброс плеера на начало (временно здесь, пока не придумаю сброс при переключении экранов)
    }
    playerBtn.classList.toggle(`player-control--play`);
    playerBtn.classList.toggle(`player-control--pause`);
  };

  playerBtn.addEventListener(`click`, playerBtnHolder);

  return element;
};

