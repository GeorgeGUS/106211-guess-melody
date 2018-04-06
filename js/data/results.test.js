import {assert} from 'chai';
import {printResults} from './results';

const stats = [4, 5, 8, 10, 20];
const resultWin = {
  points: 10,
  restNotes: 2,
  restTime: 50
};
const resultEndTime = {
  points: 10,
  restNotes: 2,
  restTime: 0
};
const resultEndAttempts = {
  points: 10,
  restNotes: 0,
  restTime: 120
};

describe(`Printing results`, () => {
  it(`should return not string`, () => {
    assert.typeOf(printResults(), `string`);
    assert.notEqual(printResults(), ``);
  });
  it(`should return right result on success`, () => {
    assert.equal(printResults(stats, resultWin), `Вы заняли 2-ое место из 5. Это лучше чем у 60% игроков.`);
  });
  it(`should return right result on end of time`, () => {
    assert.equal(printResults(stats, resultEndTime), `Время вышло! Вы не успели отгадать все мелодии.`);
  });
  it(`should return right result on end of attempts`, () => {
    assert.equal(printResults(stats, resultEndAttempts), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});
