export default (startAngle: number, endAngle: number) => {
  return 180 - Math.abs(Math.abs(endAngle - startAngle) - 180);
}
