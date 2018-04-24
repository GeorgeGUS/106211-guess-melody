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
  }

  get template() {
    return `
    <div class="player-wrapper">
      <div class="player">
        <audio src="${this.melody.src}" ${this.attrs}></audio>
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
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0; // Сброс плеера на начало (временно здесь, пока не придумаю сброс при переключении экранов)
      }
      playerBtn.classList.toggle(`player-control--play`);
      playerBtn.classList.toggle(`player-control--pause`);
    };

    /**
     * Меняет внешний вид кнопки на паузу, если музыка играет
     */
    const togglePlayerBtnOnPlaying = () => {
      playerBtn.classList.remove(`player-control--play`);
      playerBtn.classList.add(`player-control--pause`);
    };
    const togglePlayerBtnOnEnded = () => {
      playerBtn.classList.remove(`player-control--pause`);
      playerBtn.classList.add(`player-control--play`);
    };

    audio.addEventListener(`playing`, togglePlayerBtnOnPlaying);
    audio.addEventListener(`ended`, togglePlayerBtnOnEnded);
    playerBtn.addEventListener(`click`, playerBtnHolder);
  }
}
