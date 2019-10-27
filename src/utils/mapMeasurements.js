const getAngleDifference = require('./getAngleDifference');

/**
 * Returns an array of measurement objects { angle, distance }
 * @param {Number} distance
 * @param {Number} index
 * @param {Array} measurements
 * @return {Array}
 */
const mapMeasurements = (startAngle, endAngle, distance, index, measurements) => {
  let angle = getAngleDifference(startAngle, endAngle) / (measurements.length - 1) * (index - 1) + startAngle;

  if (distance) {
    angle += Math.atan(21.8 * ((155.3 - distance) / (155.3 * distance))) * (180 / Math.PI);
  }

  angle %= 360;

  return { angle, distance }
}

module.exports = mapMeasurements;
