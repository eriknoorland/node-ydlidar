const bytesToInt = require('./bytesToInt');

/**
 * Returns an array of distance measurements
 * @param {Array} acc
 * @param {Number} value
 * @param {Number} index
 * @param {Array} distances
 * @return {Array}
 */
const getMeasuredDistances = (acc, value, index, distances) => {
  if (index % 2 === 0) {
    acc.push(bytesToInt(distances.slice(index, index + 2).reverse()) / 4);
  }

  return acc;
};

module.exports = getMeasuredDistances;
