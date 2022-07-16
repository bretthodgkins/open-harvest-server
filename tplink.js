const { Client } = require('tplink-smarthome-api');

let devices = {};

const client = new Client();
// const plug = client.getDevice({ host: '192.168.0.79' }).then((device) => {
//     device.getSysInfo().then(console.log);
//     device.setPowerState(true);
// });

// Look for devices, log to console, and turn them on
client.startDiscovery().on('device-new', (device) => {
  if (!devices[device.alias]) {
    console.log(device.alias);
    devices[device.id] = device;
    if (device.alias === 'Light #1') {
      device.setPowerState(false);
    }
    if (device.alias === 'Plug 2') {
      device.setPowerState(false);
    }
    if (device.alias === 'Plug 3') {
      device.setPowerState(false);
    }
    // device.getSysInfo().then(console.log);
    // let light1 = device.children.reduce((c) => c.alias === 'Light #1');
    // console.log(device.children);
  }
});

export function setPowerStateLightOne(state) {
  if (devices['Light #1']) {
      devices['Light #1'].setPowerState(state);
  }
}
