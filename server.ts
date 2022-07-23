import * as fs from 'fs';
import { getDeviceState, setDeviceState } from './tplink';

const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors())
const port = 5000

app.use(express.static('public'));
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/config', (req, res) => {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  res.json(config);
})

app.post('/config', (req, res) => {
  let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  config = {...config, ...req.body};
  fs.writeFileSync('./config.json', JSON.stringify(config));
  res.json(config);
})

app.get('/sensors', async (req, res) => {
  let sensorData = JSON.parse(fs.readFileSync('./sensorData.json', 'utf8'));
  res.json(sensorData);
})

app.post('/sensors', (req, res) => {
  if (!req.body.values) {
    res.json({
      success: false,
      reason: 'No values provided',
    });
    return;
  }
  let sensors = JSON.parse(fs.readFileSync('./sensorData.json', 'utf8'));

  for (let key in req.body.values) {
    let value = req.body.values[key];

    let sensor = sensors[key];
    if (!sensor || !sensor.length) {
      sensor = [value];
    } else if (sensor.length < 20) {
      sensor = [...sensor, value];
    } else if (sensor.length >= 20) {
      sensor = [...sensor.slice(1), value];
    }
    sensors[key] = sensor;
  }

  fs.writeFileSync('./sensorData.json', JSON.stringify(sensors));
  res.json(sensors);
})

app.get('/switch', async (req, res) => {
  if (!req.body.alias) {
    res.json({
      success: false,
      reason: 'No alias provided',
    });
    return;
  }
  let state = await getDeviceState(req.body.alias);
  res.json({
    state,
  });
})

app.post('/switch', async (req, res) => {
  if (req.body.state !== true && req.body.state !== false) {
    res.json({
      success: false,
      reason: 'No state provided',
    });
    return;
  }
  if (!req.body.alias) {
    res.json({
      success: false,
      reason: 'No alias provided',
    });
    return;
  }
  let success = setDeviceState(req.body.alias, req.body.state);
  res.json({
    success,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
