const Transform = require('stream').Transform;
const bytesToInt = require('./utils/bytesToInt');
const getMeasuredDistances = require('./utils/getMeasuredDistances');
const mapMeasurements = require('./utils/mapMeasurements');
const numDescriptorBytes = 10;

/**
 * Parser
 */
class Parser extends Transform {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.startFlags = Buffer.from([0xAA, 0x55]);
    this.buffer = Buffer.alloc(0);
  }

  /**
   * Transform
   * @param {Buffer} chunk
   * @param {String} encoding
   * @param {Function} callback
   */
  _transform(chunk, encoding, callback) {
    this.buffer = Buffer.concat([this.buffer, chunk]);

    for (let j = 0; j < this.buffer.length; j++) {
      if (this.buffer.indexOf(this.startFlags, 0, 'hex') !== -1) {
        const packetStart = this.buffer.indexOf(this.startFlags, 0, 'hex');

        if (this.buffer.length > packetStart + numDescriptorBytes) {
          const phLSB = this.buffer[packetStart];
          const phMSB = this.buffer[packetStart + 1];
          const ctLSB = this.buffer[packetStart + 2];
          const lsMSB = this.buffer[packetStart + 3];
          const fsaLSB = this.buffer[packetStart + 4];
          const fsaMSB = this.buffer[packetStart + 5];
          const lsaLSB = this.buffer[packetStart + 6];
          const lsaMSB = this.buffer[packetStart + 7];
          const csLSB = this.buffer[packetStart + 8];
          const csMSB = this.buffer[packetStart + 9];

          const dataLength = lsMSB * 2;

          if (this.buffer.length > packetStart + numDescriptorBytes + dataLength) {
            const dataLength = lsMSB;
            const startAngle = (bytesToInt([fsaMSB, fsaLSB]) >> 1) / 64;
            const endAngle = (bytesToInt([lsaMSB, lsaLSB]) >> 1) / 64;
            const checkCode = csLSB;

            const packetEnd = packetStart + numDescriptorBytes + dataLength;
            const packet = this.buffer.slice(packetStart, packetEnd);

            this.buffer = this.buffer.slice(packetEnd);

            const dataPoints = packet.slice(numDescriptorBytes)
              .reduce(getMeasuredDistances, [])
              .map(mapMeasurements.bind(null, startAngle, endAngle));

            this.emit('scan_data', dataPoints);
          }
        }
      }
    }

    callback();
  }
}

module.exports = Parser;
