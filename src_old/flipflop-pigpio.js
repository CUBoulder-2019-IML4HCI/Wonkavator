const Gpio = require('pigpio').Gpio;


const relayPinNumber = 26;
const relayPin = new Gpio(relayPinNumber, {mode: Gpio.OUTPUT});
var relayPinState = null;

function relayOff(){
    console.log("Turning relay on Pin " + relayPinNumber + " off.")
    relayPin.digitalWrite(0);
    relayPinState = false;
}

function relayOn(){
    console.log("Turning relay on Pin "  + relayPinNumber + " on."   )
    relayPin.digitalWrite(1);
    relayPinState = true;
}

function relayToggle(){
    relayPinState ? relayOff() : relayOn();
}

relayOff();
setInterval(relayToggle, 1000);


