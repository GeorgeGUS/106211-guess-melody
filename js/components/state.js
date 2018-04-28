import AbstractView from "../abstract-view";
import {INITIAL_STATE} from "../data/results";

/**
 * Добавление первого нуля перед натуральным однозначным числом
 * @param {number} num
 * @return {string}
 */
const addFirstZero = (num) => (`0${Math.floor(num)}`).slice(-2);

/**
 * Шаблон состояния игры в виде таймера и оставшихся попыток
 * @param {Object} state - Текущее состояние игры
 * @return {Node}
 */
export default class StateView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this._initialTime = INITIAL_STATE.time;
    this.timeFinished = this.state.restTime >= 30 ? `` : `timer-value--finished`;
  }

  get template() {
    return `
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>        
      </svg>
      <div class="timer-value ${this.timeFinished}" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${addFirstZero(this.state.restTime / 60)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${addFirstZero(this.state.restTime % 60)}</span>
      </div>
      <div class="main-mistakes">
        ${new Array(this.state.restAttempts).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
      </div>
    </div>`;
  }

  getStroke(radius, restTime) {
    const strokeDashArray = 2 * Math.PI * radius;
    const timeToStrokeRatio = restTime / this._initialTime * strokeDashArray;
    const strokeDashOffset = strokeDashArray - timeToStrokeRatio;
    return {
      array: strokeDashArray,
      offset: strokeDashOffset
    };
  }

  bind() {
    const indicator = this.element.querySelector(`.timer-line`);
    const circleRadius = indicator.attributes.r.value;
    const stroke = this.getStroke(circleRadius, this.state.restTime);
    indicator.setAttribute(`stroke-dasharray`, `${stroke.array}`);
    indicator.setAttribute(`stroke-dashoffset`, `${stroke.offset}`);
  }
}
