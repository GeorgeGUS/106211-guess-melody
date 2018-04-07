import {assert} from 'chai';
import {printResults} from './results';

describe(`Printing results`, () => {
  it(`should return right result on success`, () => {
    assert.equal(printResults([4, 5, 8, 20], {
      points: 10,
      restNotes: 2,
      restTime: 50
    }), `Вы заняли 2-ое место из 5. Это лучше чем у 60% игроков.`);
  });

  it(`should return right result on lose`, () => {
    assert.equal(printResults([4, 5, 8, 20], {
      points: 10,
      restNotes: 2,
      restTime: 0
    }), `Время вышло! Вы не успели отгадать все мелодии.`);

    assert.equal(printResults([4, 5, 8, 20], {
      points: 10,
      restNotes: 0,
      restTime: 120
    }), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});
