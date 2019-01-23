import { AnyARecord } from "dns";
import { types } from "util";
import { Relay } from "johnny-five";

let five = require("johnny-five");
let Raspi = require("raspi-io");
let osc = require("osc-js");


let board = new five.Board({
    io: new Raspi()
  });

class J5Relay{
    name: string | number;
    state: boolean;
    pin: Relay; 

    constructor(name: string | number){
        this.name = name;
        this.state = false;
        this.pin = new five.Relay(name);

        this.off();
    }

    on(){
        this.pin.close();
        this.state = true;        
    }

    off(){
        this.pin.open();
        this.state = false;
    }

    toggle(){
        this.state ? this.off() : this.on();
    }

}

console.log("Board type: " + board.type)
console.log("Pin count: " + board.pins.length)


let relays = { "up": new J5Relay("GPIO26"), "down": new J5Relay("GPIO29") };


function toggleRelays(){
    relays.up.toggle();
    //relays.down.toggle();
}

board.on("ready", function() {
    setInterval(toggleRelays, 1000);
});


