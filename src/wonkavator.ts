import { AnyARecord } from "dns";
import { types } from "util";
import { Relay, Board } from "johnny-five";

const five = require("johnny-five");
const Raspi = require("raspi-io");
const OSC = require("osc-js");


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
        this.pin.open(); // my board closes the circuit by default
        this.state = true;        
    }

    // Turn off the relay
    off(){
        this.pin.close(); // my board closes the circuit by default
        this.state = false;
    }

    // Flip the state of the relay on -> off, or off -> on
    toggle(){
        this.state ? this.off() : this.on();
    }

    pressAndRelease(){
        this.on();
        setTimeout( () => { this.off() }, 250)
    }
}

//////////
// Putting our buttons on the network
//////////

const osc = new OSC({ plugin: new OSC.DatagramPlugin() })

board.on("ready", function() {
    console.log("Board id: " + board.id)
    console.log("Pin count: " + board.pins.length)

    let relays = { up: new J5Relay(25),  down: new J5Relay(29) };

    osc.on('/up', (message: any) => {
        console.log("received up command!: " + message.args)
        relays.up.pressAndRelease();
    })
    
    osc.on('/down', (message: any) => { // fixme: should create @typings for osc-js
        console.log("received down command!: " + message.args)
        relays.down.pressAndRelease();
    })

    osc.open({ host: "0.0.0.0", port: 9009})
});
