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
