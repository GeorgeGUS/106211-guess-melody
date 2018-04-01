/**
 * Показывает экран приложения
 * @param {Node} element - Элемент экрана
 */
const showScreen = (element) => {
  const mainScreen = document.querySelector(`.app .main`);
  // Заменяет текущий экран выбранным
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

export default showScreen;
