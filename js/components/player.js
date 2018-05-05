import AbstractView from "../abstract-view";

/**
 * Шаблон музыкального плеера
 */
export default class PlayerView extends AbstractView {
  /** @constructor
   * @param {HTMLElement} audio - мелодия для воспроизведения
   * @param {string} [attrs] - дополнительные атрибуты аудио, например autoplay
   */
  constructor(audio, attrs = ``) {
    super();
    this.audio = audio;
    console.dir(audio);
    console.log(audio);
    this.attrs = attrs;
    this._canPlay = false;
  }

  get template() {
    return `
    <div class="player-wrapper">
      <div class="player">
        <!--audio-->
        <button class="player-control player-control--play"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>`;
  }
  // <audio ${this.attrs} preload="auto">
  //     <source src="${this.melody}" type="audio/mpeg">
  // </audio>

  bind() {
    const player = this.element.querySelector(`.player`);
    player.appendChild(this.audio);
    // const audio = player.insertAdjacentElement(`afterbegin`, this.audio);
    const audio = this.element.querySelector(`audio`);
    const playerBtn = this.element.querySelector(`.player-control`);

    /**
     * Обработчик нажатия кнопки воспроизведения/паузы
     * @param {Event} evt - событие клика по кнопке
     */
    const playerBtnHolder = (evt) => {
      evt.preventDefault();
      if (audio.paused && this._canPlay) {
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
      this._canPlay = true;
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

    audio.addEventListener(`canplay`, onCanPlay);
    audio.addEventListener(`playing`, togglePlayerBtnOnPlaying);
    audio.addEventListener(`ended`, togglePlayerBtnOnEnded);
    playerBtn.addEventListener(`click`, playerBtnHolder);
  }
}
