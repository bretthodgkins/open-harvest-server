const Web3 = require('web3');
const { Client } = require('tplink-smarthome-api');

const MyContract = require('../open-harvest-app/src/artifacts/contracts/OpenHarvest.sol/OpenHarvest.json');

const contractAddress = '0x71C95911E9a5D330f4D621842EC243EE1343292e';

const init = async () => {
  var etherPort = 'ws://localhost:8545'
  var web3 = new Web3(new Web3.providers.WebsocketProvider(etherPort));

  const id = await web3.eth.net.getId();
  const contract = new web3.eth.Contract(
    MyContract.abi,
    contractAddress
  );

  // const addresses = await web3.eth.getAccounts();
  // const receipt = await contract.methods.toggleGreenLight().send({
  //   from: addresses[0],
  // });

  contract.events.ToggleGreenLight()
    .on('data', handleToggleGreenLight);

}

const handleToggleGreenLight = (result, err) => {
  if (err) {
    console.log(err);
    return;
  }

  if (result.returnValues['isGreenLightOn']) {
    // console.log(result);
    console.log('Light on!');
    setPowerStateLightOne(true);
  } else {
    console.log('Light off!');
    setPowerStateLightOne(false);
  }
};

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
    devices[device.alias] = device;
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

function setPowerStateLightOne(state) {
  if (devices['Light #1']) {
    console.log('here');
    devices['Light #1'].setPowerState(state);
  }
}

init();

var done = (function wait () { if (!done) setTimeout(wait, 1000) })();
