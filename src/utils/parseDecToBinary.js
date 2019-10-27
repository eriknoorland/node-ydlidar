const parseDecToBinary = dec => ('000000000' + parseInt(dec, 10).toString(2)).substr(-8);

module.exports = parseDecToBinary;
