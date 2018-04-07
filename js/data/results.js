/*
 * Вывод результатов игрока
 * @param {Array} allUserResults - Массив результатов игр других игроков
 * @param {Object} userResult - Объект результата игрока
 * @param {number} userResult.points - количество заработанных очков
 * @param {number} userResult.restNotes - оставшееся количество попыток
 * @param {number} userResult.restTime - оставшееся количество времени
 * @return {string} message - Сообщение о результате игрока
 */
export const printResults = (allUserResults, userResult) => {
  let message = ``;
  if (userResult.restTime === 0) {
    message = `Время вышло! Вы не успели отгадать все мелодии.`;
  } else if (userResult.restNotes === 0) {
    message = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {
    // результат игрока добавляется в список результатов и список сортируется по убыванию
    let stats = allUserResults;
    stats.push(userResult.points);
    stats.sort((a, b) => a - b);
    let userCount = stats.length;
    // определяется позиция результата игрока в списке
    let userPosition = userCount - stats.indexOf(userResult.points);
    // определяется процент игроков, которых вы обошли
    let userPercent = (userCount - userPosition) / userCount * 100;

    message = `Вы заняли ${userPosition}-ое место из ${userCount}. Это лучше чем у ${userPercent}% игроков.`;
  }

  return message;
};

