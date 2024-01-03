import EventEmitter from 'events';
import { SerialPort } from 'serialport';
import Parser from './Parser';
import { Options } from './interfaces';

const YDLidar = (path: string, options: Options = {}) => {
  const eventEmitter = new EventEmitter();

  let port: SerialPort;
  let parser: Parser;

  function init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (port) {
        setTimeout(reject, 0);
      }

      port = new SerialPort({ path, baudRate: 115200 });
      parser = port.pipe(new Parser(options.angleOffset || 0));

      parser.on('scan_data', (data) => {
        eventEmitter.emit('data', data);
      });

      port.on('error', error => eventEmitter.emit('error', error));
      port.on('disconnect', () => eventEmitter.emit('disconnect'));
      port.on('close', () => eventEmitter.emit('close'));
      port.on('open', onPortOpen.bind(null, resolve));
    });
  }

  function onPortOpen(resolve: Function) {
    port.flush(error => {
      if (error) {
        eventEmitter.emit('error', error);
      }

      resolve();
    });
  }

  return Object.freeze({
    init,
    on: eventEmitter.on.bind(eventEmitter),
    off: eventEmitter.off.bind(eventEmitter),
  });
};

module.exports = YDLidar;
