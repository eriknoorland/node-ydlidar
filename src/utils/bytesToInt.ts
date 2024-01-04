import parseDecToBinary from './parseDecToBinary';

export default (bytes: number[]) => {
  const binary = bytes.reduce((acc, byte) => `${acc}${parseDecToBinary(byte)}`, '');

  return parseInt(binary, 2);
};
