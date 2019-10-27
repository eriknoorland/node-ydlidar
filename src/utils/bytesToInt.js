const parseDecToBinary = require('./parseDecToBinary');

/**
 * Combines an array of bytes and converts it to a number
 * @param {Array} bytes - MSB first
 * @return {Number}
 */
const bytesToInt = bytes => {
  const binary = bytes.reduce((acc, byte) => `${acc}${parseDecToBinary(byte)}`, '');

  return parseInt(binary, 2);
};

module.exports = bytesToInt;
