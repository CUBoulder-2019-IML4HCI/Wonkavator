"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var five = require("johnny-five");
var Raspi = require("raspi-io");
var osc = require("osc-js");
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
    J5Relay.prototype.on = function () {
        this.pin.close();
        this.state = true;
    };
    J5Relay.prototype.off = function () {
        this.pin.open();
        this.state = false;
    };
    J5Relay.prototype.toggle = function () {
        this.state ? this.off() : this.on();
    };
    return J5Relay;
}());
console.log("Board type: " + board.type);
console.log("Pin count: " + board.pins.length);
var relays = { "up": new J5Relay("GPIO26"), "down": new J5Relay("GPIO29") };
function toggleRelays() {
    relays.up.toggle();
    //relays.down.toggle();
}
board.on("ready", function () {
    setInterval(toggleRelays, 1000);
});
//# sourceMappingURL=wonkavator.js.map