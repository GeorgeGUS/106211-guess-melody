const template = document.querySelector(`#templates`);
const screens = `content` in template ? template.content.querySelectorAll(`.main`) : [];

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
showScreen(screens, 0);
