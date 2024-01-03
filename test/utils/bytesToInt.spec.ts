import assert from 'assert';
import bytesToInt from '../../src/utils/bytesToInt';

describe('utils', () => {
  describe('#bytesToInt()', () => {
    it('should return a number', () => {
      const expected = typeof bytesToInt([0xA1, 0xFF]);
      const actual = 'number';

      assert.equal(expected, actual);
    });

    it('should return the number 255', () => {
      const expected = bytesToInt([0x00, 0xFF]);
      const actual = 255;

      assert.equal(expected, actual);
    });

    it('should return the number 28645', () => {
      const expected = bytesToInt([0x6F, 0xE5]);
      const actual = 28645;

      assert.equal(expected, actual);
    });
  });
});
