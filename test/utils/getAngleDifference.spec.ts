import assert from 'assert';
import getAngleDifference from '../../src/utils/getAngleDifference';

describe('utils', () => {
  describe('#getAngleDifference()', () => {
    it('should return a number', () => {
      const expected = typeof getAngleDifference(10, 20);
      const actual = 'number';

      assert.equal(expected, actual);
    });

    it('should return the number 45 as the angular difference between 45 and 90', () => {
      const expected = getAngleDifference(45, 90);
      const actual = 45;

      assert.equal(expected, actual);
    });

    it('should return the number 4 as the angular difference between 358 and 2', () => {
      const expected = getAngleDifference(358, 2);
      const actual = 4;

      assert.equal(expected, actual);
    });
  });
});
