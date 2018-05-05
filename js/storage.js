export default class Storage {
  constructor() {
    this._elements = new Map();
  }

  get storedElements() {
    return this._elements;
  }

  preloadSong(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      try {
        audio.addEventListener(`canplaythrough`, () => {
          this._elements.set(src, audio);
          console.log('Audio');
          resolve();
        });
      } catch (e) {
        reject(e);
      }

      audio.src = src;
      audio.load();
    });
  }

  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      try {
        image.addEventListener(`load`, () => {
          this._elements.set(src, image);
          console.log('Image');
          resolve();
        });
      } catch (e) {
        reject(e);
      }

      image.src = src;
    });
  }
}
