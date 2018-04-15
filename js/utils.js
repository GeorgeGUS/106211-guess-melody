/* eslint-disable no-nested-ternary */
/**
 * Создаёт новый DOM-элемент из шаблонной строки
 * @param {string} stringHTML - строка с HTML содержимым
 * @return {Node}
 */

export const createElementFromString = (stringHTML) => {
  const template = document.createElement(`template`);
  template.innerHTML = stringHTML.trim();
  return template.content.firstChild;
};

/**
 * Показывает экран приложения
 * @param {Node} element - Элемент экрана
 */
export const showScreen = (element) => {
  const mainScreen = document.querySelector(`.app .main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

/**
 * Склоняет числительные на русском языке
 * @param {number} n - Натуральное число
 * @param {Array} titles - Массив форм склонений. Пример: [`число`,`числа`,`чисел`]
 * @return {string} - Строка с номером и числительным
 */
export const declOfNum = (n, titles) => {
  if (n < 0) {
    return null;
  }
  const plural = (n % 10 === 1 && n % 100 !== 11) ? 0 : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 1 : 2;

  return `${n}&nbsp;${titles[plural]}`;
};

/**
 * Возвращает число из строки (если число одно)
 * @param {string} string
 * @return {number}
 */
export const getNumFromString = (string) => Number(string.replace(/\D/g, ``));
