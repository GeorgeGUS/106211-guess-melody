import {assert} from 'chai';
import {createTimer} from './timer';

const START_TIME = 300;

describe(`Creating timer`, () => {
  it(`should return object with timer`, () => {
    assert.equal(createTimer(START_TIME), {
      // Что за объект таймера здесь должен создаваться?
    });
  });
  it(`should return answer on end of time`, () => {
    assert.equal(createTimer(0), `Время вышло!`);
  });
});
