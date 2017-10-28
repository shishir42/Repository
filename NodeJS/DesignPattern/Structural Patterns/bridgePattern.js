//Decouple an abstraction from its implementation so that the two can vary independently.

// The Bridge pattern allows two components, a client and a service, to work together with
// each component having its own interface. Bridge is a high-level architectural pattern and
// its main goal is to write better code through two levels of abstraction.
// It facilitates very loose coupling of objects. It is sometimes referred to as a double Adapter pattern.
//
// An example of the Bridge pattern is an application (the client) and a database driver (the service).
// The application writes to a well-defined database API, for example ODBC, but behind this API you will
// find that each driver's implementation is totally
// different for each database vendor (SQL Server, MySQL, Oracle, etc.).
//
// The Bridge pattern is a great pattern for driver development but it is rarely seen in JavaScript.

// input devices

var Gestures = function (output) {
    this.output = output;

    this.tap = function () { this.output.click(); }
    this.swipe = function () { this.output.move(); }
    this.pan = function () { this.output.drag(); }
    this.pinch = function () { this.output.zoom(); }
};

var Mouse = function (output) {
    this.output = output;

    this.click = function () { this.output.click(); }
    this.move = function () { this.output.move(); }
    this.down = function () { this.output.drag(); }
    this.wheel = function () { this.output.zoom(); }
};

// output devices

var Screen = function () {
    this.click = function () { log.add("Screen select"); }
    this.move = function () { log.add("Screen move"); }
    this.drag = function () { log.add("Screen drag"); }
    this.zoom = function () { log.add("Screen zoom in"); }
};

var Audio = function () {
    this.click = function () { log.add("Sound oink"); }
    this.move = function () { log.add("Sound waves"); }
    this.drag = function () { log.add("Sound screetch"); }
    this.zoom = function () { log.add("Sound volume up"); }
};

// logging helper

var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {

    var screen = new Screen();
    var audio = new Audio();

    var hand = new Gestures(screen);
    var mouse = new Mouse(audio);

    hand.tap();
    hand.swipe();
    hand.pinch();

    mouse.click();
    mouse.move();
    mouse.wheel();

    log.show();
}

run();
