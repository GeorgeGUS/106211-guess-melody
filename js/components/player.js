import AbstractView from "../abstract-view";

/**
 * Шаблон музыкального плеера
 */
export default class PlayerView extends AbstractView {
  /** @constructor
   * @param {Object} melody - мелодия для воспроизведения
   * @param {string} [attrs] - дополнительные атрибуты аудио, например autoplay
   */
  constructor(melody, attrs = ``) {
    super();
    this.melody = melody;
    this.attrs = attrs;
    this.canPlay = false;
  }

  get template() {
    return `
    <div class="player-wrapper">
      <div class="player">
        <audio ${this.attrs}>
          <source src="${this.melody}" type="audio/mpeg">
        </audio>
        <button class="player-control player-control--play"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>`;
  }

  bind() {
    const audio = this.element.querySelector(`audio`);
    const playerBtn = this.element.querySelector(`.player-control`);

    /**
     * Обработчик нажатия кнопки воспроизведения/паузы
     * @param {Event} evt - событие клика по кнопке
     */
    const playerBtnHolder = (evt) => {
      evt.preventDefault();
      if (audio.paused && this.canPlay) {
        audio.play();
      } else {
        audio.pause();
      }
      const btn = evt.target;
      if (btn.classList.contains(`player-control--pause`)) {
        btn.classList.remove(`player-control--pause`);
        btn.classList.add(`player-control--play`);
      }
    };

    const onCanPlay = () => {
      this.canPlay = true;
    };
    /**
     * Меняет внешний вид кнопки на паузу, если музыка играет
     */
    const togglePlayerBtnOnPlaying = () => {
      playerBtn.classList.toggle(`player-control--play`);
      playerBtn.classList.toggle(`player-control--pause`);
    };
    const togglePlayerBtnOnEnded = () => {
      playerBtn.classList.remove(`player-control--pause`);
      playerBtn.classList.add(`player-control--play`);
    };

    audio.addEventListener(`canplaythrough`, onCanPlay);
    audio.addEventListener(`playing`, togglePlayerBtnOnPlaying);
    audio.addEventListener(`ended`, togglePlayerBtnOnEnded);
    playerBtn.addEventListener(`click`, playerBtnHolder);
  }
}
