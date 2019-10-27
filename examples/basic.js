const YDLidar = require('../src/YDLidar');
const lidar = YDLidar('/dev/tty.SLAB_USBtoUART');

lidar.on('data', (data) => {
  console.log(data);
});

lidar.init();
