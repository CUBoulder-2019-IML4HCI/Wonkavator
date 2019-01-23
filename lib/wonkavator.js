"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var five = require("johnny-five");
var Raspi = require("raspi-io");
var OSC = require("osc-js");
///////////////
/// Defining our button pushing mechanism
///////////////
var board = new five.Board({
    io: new Raspi()
});
var J5Relay = /** @class */ (function () {
    function J5Relay(name) {
        this.name = name;
        this.state = false;
        this.pin = new five.Relay(name);
        this.off();
    }
    // Turn on the relay
    J5Relay.prototype.on = function () {
        this.pin.close();
        this.state = true;
    };
    // Turn off the relay
    J5Relay.prototype.off = function () {
        this.pin.open();
        this.state = false;
    };
    // Flip the state of the relay on -> off, or off -> on
    J5Relay.prototype.toggle = function () {
        this.state ? this.off() : this.on();
    };
    J5Relay.prototype.pressAndRelease = function () {
        this.on();
        setTimeout(this.off, 250);
    };
    return J5Relay;
}());
console.log("Board id: " + board.id);
console.log("Pin count: " + board.pins.length);
var relays = { up: new J5Relay("GPIO26"), down: new J5Relay("GPIO29") };
function toggleRelays() {
    relays.up.toggle();
    relays.down.toggle();
}
board.on("ready", function () {
    setInterval(toggleRelays, 1000);
});
//////////
// Putting our buttons on the network
//////////
var osc = new OSC();
osc.on('/up', function (message) {
    relays.up.pressAndRelease();
});
osc.on('/down', function (message) {
    relays.down.pressAndRelease();
});
osc.open({ port: 9009 });
//# sourceMappingURL=wonkavator.js.map