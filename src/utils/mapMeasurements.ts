import { Measurement } from '../interfaces';
import getAngleDifference from './getAngleDifference';

export default (startAngle: number, endAngle: number, distance: number, index: number, measurements: number[]): Measurement => {
  let angle = getAngleDifference(startAngle, endAngle) / (measurements.length - 1) * (index - 1) + startAngle;

  if (distance) {
    angle += Math.atan(21.8 * ((155.3 - distance) / (155.3 * distance))) * (180 / Math.PI);
  }

  angle %= 360;

  return { angle, distance }
}
