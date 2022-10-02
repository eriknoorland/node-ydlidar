const EventEmitter = require('events');
const SerialPort = require('serialport');
const Parser = require('./Parser');

/**
 * YDLidar
 * @param {String} path
 * @param {Object} options
 * @return {Object}
 */
const YDLidar = (path, options = {}) => {
  const eventEmitter = new EventEmitter();

  let parser;
  let port;

  /**
   * Constructor
   */
  function constructor() {}

  /**
   * Init
   * @return {Promise}
   */
  function init() {
    return new Promise((resolve, reject) => {
      if (port) {
        setTimeout(reject, 0);
      }

      port = new SerialPort(path, { baudRate: 115200 });
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

  /**
   * Port open event handler
   * @param {Function} resolve
   */
  function onPortOpen(resolve) {
    port.flush(error => {
      if (error) {
        eventEmitter.emit('error', error);
      }

      resolve();
    });
  }

  constructor();

  return {
    init,
    on: eventEmitter.on.bind(eventEmitter),
    off: eventEmitter.off.bind(eventEmitter),
  };
};

module.exports = YDLidar;
