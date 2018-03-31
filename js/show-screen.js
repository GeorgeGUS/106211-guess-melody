/**
 * Показывает экран приложения
 * @param {Node} element - Элемент экрана
 */
const showScreen = (element) => {
  const mainScreen = document.querySelector(`.app .main`);
  const newScreen = element.cloneNode(true);

  // Заменяет текущий экран выбранным
  mainScreen.parentNode.replaceChild(newScreen, mainScreen);
};

export default showScreen;
