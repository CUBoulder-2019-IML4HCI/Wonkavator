import { AnyARecord } from "dns";
import { types } from "util";
import { Relay, Board } from "johnny-five";

let five = require("johnny-five");
let Raspi = require("raspi-io");
let OSC = require("osc-js");


///////////////
/// Defining our button pushing mechanism
///////////////

let board:Board = new five.Board({
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

    // Turn on the relay
    on(){
        this.pin.close();
        this.state = true;        
    }

    // Turn off the relay
    off(){
        this.pin.open();
        this.state = false;
    }

    // Flip the state of the relay on -> off, or off -> on
    toggle(){
        this.state ? this.off() : this.on();
    }

    pressAndRelease(){
        this.on();
        setTimeout(this.off, 250)
    }
}

console.log("Board id: " + board.id)
console.log("Pin count: " + board.pins.length)

let relays = { up: new J5Relay("GPIO26"), down: new J5Relay("GPIO29") };

function toggleRelays(){
    relays.up.toggle();
    relays.down.toggle();
}

board.on("ready", function() {
    setInterval(toggleRelays, 1000);
});


//////////
// Putting our buttons on the network
//////////

const osc = new OSC()

osc.on('/up', (message: any) => {
    relays.up.pressAndRelease();
})


osc.on('/down', (message: any) => {
    relays.down.pressAndRelease();
})

osc.open({ port: 9009})