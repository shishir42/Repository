//Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
//Template Method lets subclasses redefine certain steps of an algorithm without changing
//the algorithm's structure.

//The Template Method pattern provides an outline of a series of steps for an algorithm.
//Objects that implement these steps retain the original structure of the algorithm
//but have the option to redefine or adjust certain steps.
//This pattern is designed to offer extensibility to the client developer.

//Template Methods are frequently used in general purpose frameworks or libraries
//that will be used by other developer An example is an object that fires a sequence of
//events in response to an action, for example a process request.
//The object generates a 'preprocess' event, a 'process' event and a 'postprocess' event.
//The developer has the option to adjust the response to immediately before the processing,
//during the processing and immediately after the processing.


var datastore = {
    process: function() {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
};

function inherit(proto) {
    var F = function() { };
    F.prototype = proto;
    return new F();
}

// log helper

var log = (function() {
    var log = "";

    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

function run() {
    var mySql = inherit(datastore);

    // implement template steps

    mySql.connect = function() {
        log.add("MySQL: connect step");
    };

    mySql.select = function() {
        log.add("MySQL: select step");
    };

    mySql.disconnect = function() {
        log.add("MySQL: disconnect step");
    };

    mySql.process();

    log.show();
}

run();
