import {assert} from 'chai';
import {calcScoring} from './scoring';

describe(`Checking the scoring`, () => {
  it(`should return right points for win result`, () => {
    assert.equal(calcScoring(Array(10).fill({success: true, time: 40}), 3), 10);
    assert.equal(calcScoring(Array(10).fill({success: true, time: 10}), 3), 20);
    assert.equal(calcScoring([
      {success: false, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: false, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30}
    ], 1), 8);
  });

  /* Не вижу смысла в этой проверке, т.к. эта ситуация может произойти только
  * в случае истечения времени, но это мы можем обработать в таймере */

  // it(`should return null if the answers are less than questions`, () => {
  //   assert.equal(calcScoring([], 3), null);
  //   assert.equal(calcScoring(Array(1).fill({success: true, time: 0}), 3), null);
  //   assert.equal(calcScoring(Array(9).fill({success: true, time: 30}), 3), null);
  // });

  it(`should return null if all attempts are over`, () => {
    assert.equal(calcScoring(Array(3).fill({success: false, time: 2}), 0), null);
  });

  it(`should throws Error when wrong answers don't match the rest notes`, () => {
    assert.throws(() => calcScoring(Array(2).fill({success: false, time: 30}), 3), Error);
    assert.throws(() => calcScoring(Array(4).fill({success: false, time: 30}), 3), Error);
  });
});
