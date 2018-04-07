/*
 * Создание объекта таймера
 * @param {number} timeInSeconds - Время работы таймера в секундах
 * @return {Object} - Объект таймера
 */
export default class Timer {
  constructor(timeInSeconds) {
    this.startTime = timeInSeconds;
    this.mutableTime = this.startTime;
  }

  reset() {
    this.mutableTime = this.startTime;
  }

  end() {
    return `Время вышло!`;
  }

  tick() {
    let isTimeEnd = this.mutableTime > 0;
    return isTimeEnd ? --this.mutableTime : this.end();
  }
}
