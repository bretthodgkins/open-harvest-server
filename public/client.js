console.log('Client-side code running');

const btnGreenOn = document.getElementById('btnGreenOn');
const btnGreenOff = document.getElementById('btnGreenOff');

const btnRedOn = document.getElementById('btnRedOn');
const btnRedOff = document.getElementById('btnRedOff');

const btnLeftPumpOn = document.getElementById('btnLeftPumpOn');
const btnLeftPumpOff = document.getElementById('btnLeftPumpOff');

const btnRightPumpOn = document.getElementById('btnRightPumpOn');
const btnRightPumpOff = document.getElementById('btnRightPumpOff');

const touchEvent = ( window.ontouchstart === null ) ? 'touchstart' : 'click';

function updateConfig(data) {
  fetch("http://192.168.0.81:5000/config", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });
}

btnGreenOn.addEventListener(touchEvent, function(e) {
  console.log('Green ON');
  updateConfig({green: 1});
});

btnGreenOff.addEventListener(touchEvent, function(e) {
  console.log('Green OFF');
  updateConfig({green: 0});
});

btnRedOn.addEventListener(touchEvent, function(e) {
  console.log('Red ON');
  updateConfig({red: 1});
});

btnRedOff.addEventListener(touchEvent, function(e) {
  console.log('Red OFF');
  updateConfig({red: 0});
});

btnLeftPumpOn.addEventListener(touchEvent, function(e) {
  console.log('Left Pump ON');
  updateConfig({pump1: 1});
});

btnLeftPumpOff.addEventListener(touchEvent, function(e) {
  console.log('Left Pump OFF');
  updateConfig({pump1: 0});
});

btnRightPumpOn.addEventListener(touchEvent, function(e) {
  console.log('Right Pump ON');
  updateConfig({pump2: 1});
});

btnRightPumpOff.addEventListener(touchEvent, function(e) {
  console.log('Right Pump OFF');
  updateConfig({pump2: 0});
});
