const assert = require('assert');
const parseDecToBinary = require('../../src/utils/parseDecToBinary');

describe('utils', () => {
  describe('#parseDecToBinary()', () => {
    it('should return a string', () => {
      const expected = typeof parseDecToBinary(10);
      const actual = 'string';

      assert.equal(expected, actual);
    });

    it('should return an 8 bit binary string', () => {
      const expected = parseDecToBinary(20).length;
      const actual = 8;

      assert.equal(expected, actual);
    });

    it('should return 255 as an 8 bit binary string', () => {
      const expected = parseDecToBinary(255);
      const actual = '11111111';

      assert.equal(expected, actual);
    });

    it('should return 64 as an 8 bit binary string', () => {
      const expected = parseDecToBinary(64);
      const actual = '01000000';

      assert.equal(expected, actual);
    });

    it('should return 1 as an 8 bit binary string', () => {
      const expected = parseDecToBinary(1);
      const actual = '00000001';

      assert.equal(expected, actual);
    });
  });
});
