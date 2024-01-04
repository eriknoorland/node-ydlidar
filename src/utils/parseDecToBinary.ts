export default (dec: number) => ('000000000' + dec.toString(2)).substr(-8);
