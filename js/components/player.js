import AbstractView from "../abstract-view";
import LevelView from "./level";

/**
 * Шаблон музыкального плеера
 */
export default class PlayerView extends AbstractView {
  constructor(audio) {
    super();
    this.audio = audio;
    this._playPromise = null;
  }

  get template() {
    return `
    <div class="player-wrapper">
      <div class="player">
        <button class="player-control player-control--play"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>`;
  }

  async play() {
    LevelView.setNowPlaying(this.audio);
    this._curAudio = LevelView.getNowPlaying();
    this._playPromise = await this._curAudio.play();
  }

  pause() {
    if (!this._playPromise && this._curAudio) {
      this._curAudio.pause();
    }
  }

  stop() {
    this._curAudio.pause();
    this._curAudio.currentTime = 0;
  }

  toggle() {
    if (this._curAudio && this._curAudio !== this.audio) {
      this.stop();
      if (this._playerBtn.classList.contains(`player-control--pause`)) {
        this._playerBtn.classList.remove(`player-control--pause`);
        this._playerBtn.classList.add(`player-control--play`);
      }
    }
    this._curAudio = this.audio;
  }

  bind() {
    this._playerBtn = this.element.querySelector(`.player-control`);

    /**
     * Обработчик нажатия кнопки воспроизведения/паузы
     * @param {Event} evt - событие клика по кнопке
     */
    const playerBtnHolder = (evt) => {
      evt.preventDefault();
      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
      const btn = evt.target;
      if (btn.classList.contains(`player-control--pause`)) {
        btn.classList.remove(`player-control--pause`);
        btn.classList.add(`player-control--play`);
      }
    };

    /**
     * Меняет внешний вид кнопки на паузу, если музыка играет
     */
    const togglePlayerBtnOnPlaying = () => {
      this._playerBtn.classList.toggle(`player-control--play`);
      this._playerBtn.classList.toggle(`player-control--pause`);
    };
    const togglePlayerBtnOnEnded = () => {
      this._playerBtn.classList.remove(`player-control--pause`);
      this._playerBtn.classList.add(`player-control--play`);
    };

    // this.audio.addEventListener(`playing`, togglePlayerBtnOnPlaying);
    // this.audio.addEventListener(`ended`, togglePlayerBtnOnEnded);
    this._playerBtn.addEventListener(`click`, playerBtnHolder);
  }
}
