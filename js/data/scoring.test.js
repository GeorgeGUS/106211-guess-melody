import {assert} from 'chai';
import {calcScoring} from './scoring';

describe(`Checking the scoring`, () => {
  it(`should return right points for all correct answers`, () => {
    assert.equal(calcScoring([
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30}
    ], 3), 10);
  });
  it(`should return right points for all correct and fast answers`, () => {
    assert.equal(calcScoring([
      {success: true, time: 1},
      {success: true, time: 2},
      {success: true, time: 5},
      {success: true, time: 10},
      {success: true, time: 15},
      {success: true, time: 20},
      {success: true, time: 25},
      {success: true, time: 26},
      {success: true, time: 27},
      {success: true, time: 28},
      {success: true, time: 29}
    ], 3), 20);
  });

  it(`should return right points if the answers are less than 10`, () => {
    assert.equal(calcScoring([{success: true, time: 1}], 3), -1);
  });
  it(`should return right points if if all attempts are over`, () => {
    assert.equal(calcScoring([
      {success: false, time: 1},
      {success: false, time: 2},
      {success: false, time: 5}
    ], 0), -1);
  });

  // it(`should check that wrong answers are equal to rest notes`, () => {
  //   assert.throws(() => calcScoring([false, false, false], 3), /Wrong answers should be equal to rest notes/);
  // });
});
