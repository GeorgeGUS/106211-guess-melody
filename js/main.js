/** Список кодовых номеров клавиш */
const KeyNumber = {
  ALT: 18,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
};

/** Хранилище состояний нажатия клавиш */
const keyState = {
  18: false,
  37: false,
  39: false
};

const template = document.querySelector(`#templates`);
const screens = `content` in template ? template.content.querySelectorAll(`.main`) : [];

// Зададим индекс начального экрана
let startScreen = 0;

/**
 * Показывает выбранный экран по номеру индекса массива
 * @param {array} arr - Массив экранов
 * @param {number} i - Индекс экрана в массиве
 */
const showScreen = (arr, i) => {
  if (i < arr.length) {
    const mainScreen = document.querySelector(`.app .main`);
    const newScreen = arr[i];

    if (mainScreen !== newScreen) {
      // Заменяет текущий экран выбранным
      mainScreen.parentNode.replaceChild(newScreen, mainScreen);
    }
  }
};

// Покажем приветственный экран
showScreen(screens, startScreen);

/**
 * Переключает экраны
 * @param {array} arr - Массив экранов
 * @param {number} step - Шаг и направление переключения
 * @param {boolean} [round=false] - Переключение линейное либо круговое
 */
const toggleScreens = (arr, step, round = false) => {
  startScreen += step;
  if (startScreen < 0) {
    startScreen = round ? arr.length - 1 : 0;
  } else if (startScreen >= arr.length) {
    startScreen = round ? 0 : arr.length - 1;
  }
  showScreen(screens, startScreen);
};

/**
 * Обработчик нажатия клавиш
 * @param {Event} evt - событие нажатия клавиши
 */
const onKeyDown = (evt) => {
  if (evt.keyCode in keyState) {
    keyState[evt.keyCode] = true;
    if (keyState[KeyNumber.LEFT_ARROW] && keyState[KeyNumber.ALT]) {
      toggleScreens(screens, -1);
    } else if (keyState[KeyNumber.RIGHT_ARROW] && keyState[KeyNumber.ALT]) {
      toggleScreens(screens, 1);
    }
  }
};

/**
 * Обработчик отпускания клавиш
 * @param {Event} evt - событие отпускания клавиши
 */
const onKeyUp = (evt) => {
  if (evt.keyCode in keyState) {
    keyState[evt.keyCode] = false;
  }
};

document.addEventListener(`keydown`, onKeyDown);
document.addEventListener(`keyup`, onKeyUp);
