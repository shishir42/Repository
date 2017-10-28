//Allow an object to alter its behavior when its internal state changes.
//The object will appear to change its class.

//The State pattern provides state-specific logic to a limited set of objects in which
//each object represents a particular state. This is best explained with an example.

//Say a customer places an online order for a TV. While this order is being processed it can in
//one of many states: New, Approved, Packed, Pending, Hold, Shipping, Completed, or Canceled.
//If all goes well the sequence will be New, Approved, Packed, Shipped, and Completed.
//However, at any point something unpredictable may happen, such as no inventory, breakage, or customer cancelation.
//If that happens the order needs to be handled appropriately.

//Applying the State pattern to this scenario will provide you with 8 State objects, each with its
//own set of properties (state) and methods (i.e. the rules of acceptable state transitions).
//State machines are often implemented using the State pattern. These state machines simply have their
//State objects swapped out with another one when a state transition takes place.

//Two other examples where the State pattern is useful include: vending machines that dispense products
//when a correct combination of coins is entered, and elevator logic which moves riders up or down
//depending on certain complex rules that attempt to minimize wait and ride times.

var TrafficLight = function () {
    var count = 0;
    var currentState = new Red(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
}

var Red = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Red --> for 1 minute");
        light.change(new Green(light));
    }
};

var Yellow = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Yellow --> for 10 seconds");
        light.change(new Red(light));
    }
};

var Green = function (light) {
    this.light = light;

    this.go = function () {
        log.add("Green --> for 1 minute");
        light.change(new Yellow(light));
    }
};

// log helper

var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {
    var light = new TrafficLight();
    light.start();

    log.show();
}

run();
