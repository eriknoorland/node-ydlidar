const getAngleDifference = (startAngle, endAngle) => {
  return 180 - Math.abs(Math.abs(endAngle - startAngle) - 180);
}

module.exports = getAngleDifference;
