/* eslint-disable no-console */
import {assert} from 'chai';
import Timer from './timer';

describe(`Creating timer`, () => {
  it(`should return object with timer`, () => {
    assert.isObject(new Timer());
  });
  it(`should return right time on tick call`, () => {
    const timer = new Timer(300);
    assert.equal(timer.tick(), 299);
    assert.equal(timer.tick(), 298);
    assert.equal(new Timer(1).tick(), 0);
  });
  it(`should return null and call function on end of time`, () => {
    const timer = new Timer(0, null, () => console.log(`Время вышло!`));
    assert.equal(timer.tick(), null);
  });
});
