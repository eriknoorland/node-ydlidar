import { Transform } from 'stream';
import bytesToInt from'./utils/bytesToInt';
import getMeasuredDistances from'./utils/getMeasuredDistances';
import mapMeasurements from'./utils/mapMeasurements';
import { Measurement } from './interfaces';

const numDescriptorBytes = 10;

class Parser extends Transform {
  private angleOffset: number;
  private startFlags: Buffer;
  private buffer: Buffer;

  constructor(angleOffset: number) {
    super();

    this.angleOffset = angleOffset;
    this.startFlags = Buffer.from([0xAA, 0x55]);
    this.buffer = Buffer.alloc(0);
  }

  _transform(chunk: Buffer, encoding: string, callback: Function) {
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

            [...packet.slice(numDescriptorBytes)]
              .reduce(getMeasuredDistances, [])
              .map(mapMeasurements.bind(null, startAngle, endAngle))
              .forEach(({ angle, distance }: Measurement) => {
                if (!angle || !distance) {
                  return;
                }

                let offsettedAngle = angle + this.angleOffset;

                if (offsettedAngle < 0) {
                  offsettedAngle = 360 - offsettedAngle;
                }

                if (offsettedAngle > 360) {
                  offsettedAngle %= 360;
                }

                this.emit('scan_data', {
                  angle: offsettedAngle,
                  distance,
                });
              });
          }
        }
      }
    }

    callback();
  }
}

export default Parser;
