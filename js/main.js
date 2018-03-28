/** Список кодовых номеров клавиш */
const KeyNumber = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
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

// Покажем при первом запуске приветственный экран
showScreen(screens, startScreen);

/**
 * Переключает экраны
 * @param {array} arr - Массив экранов
 * @param {number} step - Шаг и направление переключения
 */
const toggleScreens = (arr, step) => {
  startScreen += step;
  if (startScreen < 0) {
    startScreen = 0;
  } else if (startScreen >= arr.length) {
    startScreen = arr.length - 1;
  }
  showScreen(screens, startScreen);
};

/**
 * Обработчик нажатия клавиш
 * @param {Event} evt - событие нажатия клавиши
 */
const onKeyDown = (evt) => {
  if (evt.altKey && evt.keyCode === KeyNumber.LEFT_ARROW) {
    toggleScreens(screens, -1);
  } else if (evt.altKey && evt.keyCode === KeyNumber.RIGHT_ARROW) {
    toggleScreens(screens, 1);
  }
};

document.addEventListener(`keydown`, onKeyDown);
