# node-ydlidar
A Node module to communicate with the YDLidar over USB.

## installation
```
npm install git+https://git@github.com/eriknoorland/node-ydlidar.git
```

## usage
```javascript
const YDLidar = require('node-ydlidar');
const lidar = YDLidar('/dev/tty.SLAB_USBtoUART');

lidar.on('data', (data) => {
  console.log(data);
});

lidar.init();
```
