import {assert} from 'chai';
import Timer from './timer';

describe(`Creating timer`, () => {
  it(`should return object with timer`, () => {
    assert.isObject(new Timer());
  });
  it(`should return right time on tick call`, () => {
    let timer = new Timer(300);
    assert.equal(timer.tick(), 299);
    assert.equal(timer.tick(), 298);
    timer.reset();
    assert.equal(timer.tick(), 299);
    assert.equal(new Timer(1).tick(), 0);
  });
  it(`should return right answer on end of time`, () => {
    assert.equal(new Timer(0).tick(), `Время вышло!`);
  });
});
