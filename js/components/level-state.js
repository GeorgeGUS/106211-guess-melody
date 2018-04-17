import {createElementFromString} from '../utils';

export default (state) => {
  const addFirstZero = (num) => (`0${Math.floor(num)}`).slice(-2);
  const mistakes = new Array(state.user.restNotes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``);

  const levelState = `
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>        
      </svg>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${addFirstZero(state.time / 60)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${addFirstZero(state.time % 60)}</span>
      </div>
      <div class="main-mistakes">
        ${mistakes}
      </div>
    </div>
  `;

  return createElementFromString(levelState);
};
