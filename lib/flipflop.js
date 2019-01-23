"use strict";
var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    io: new Raspi()
});
var relayPinNumber = "GPIO26";
var relayPin = new five.Relay(relayPinNumber);
var relayPinState = false;
function relayOff() {
    relayPin.open();
    relayPinState = false;
}
function relayOn() {
    relayPin.close();
    relayPinState = true;
}
function relayToggle() {
    relayPinState ? relayOff() : relayOn();
}
console.log("Board type: " + board.type);
console.log("Pin count: " + board.pins.length);
board.on("ready", function () {
    relayOff();
    setInterval(relayToggle, 1000);
});
//# sourceMappingURL=flipflop.js.map