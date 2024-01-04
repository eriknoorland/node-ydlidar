import bytesToInt from './bytesToInt';

export default (acc: number[], value: number, index: number, distances: number[]): number[] => {
  if (index % 2 === 0) {
    acc.push(bytesToInt(distances.slice(index, index + 2).reverse()) / 4);
  }

  return acc;
};
