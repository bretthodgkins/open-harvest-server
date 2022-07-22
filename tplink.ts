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
    console.log(`Discovered device '${device.alias}'`);
    devices[device.alias] = device;
  }
});

export async function getDeviceState(alias) {
  if (!devices[alias]) {
    return {
      success: false,
      reason: 'Device not found',
    };
  }

  let sysInfo = await devices[alias].getSysInfo();
  let child = sysInfo.children.filter((c) => c.alias === alias);
  if (!child.length) {
    return {
      success: false,
      reason: 'Device child not found',
    };
  }
  return child[0].state;
}

export async function getDeviceSysInfo(alias) {
  if (!devices[alias]) return false;

  return devices[alias].getSysInfo();
};

export function setDeviceState(alias, state) {
  if (!devices[alias]) return false;

  devices[alias].setPowerState(state);
  return true;
};
