//Define a family of algorithms, encapsulate each one, and make them interchangeable.
//Strategy lets the algorithm vary independently from clients that use it.


//The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task.
//It allows a method to be swapped out at runtime by any other method (strategy) without the
//client realizing it. Essentially, Strategy is a group of algorithms that are interchangeable.

//Say we like to test the performance of different sorting algorithms to an array of numbers:
// shell sort, heap sort, bubble sort, quicksort, etc. Applying the Strategy pattern to these algorithms
//allows the test program to loop through all algorithms, simply by changing them at runtime and
//test each of these against the array. For Strategy to work all method signatures must be the same
//so that they can vary without the client program knowing about it.


var Shipping = function() {
    this.company = "";
};

Shipping.prototype = {
    setStrategy: function(company) {
        this.company = company;
    },

    calculate: function(package) {
        return this.company.calculate(package);
    }
};

var UPS = function() {
    this.calculate = function(package) {
        // calculations...
        return "$45.95";
    }
};

var USPS = function() {
    this.calculate = function(package) {
        // calculations...
        return "$39.40";
    }
};

var Fedex = function() {
    this.calculate = function(package) {
        // calculations...
        return "$43.20";
    }
};

// log helper

var log = (function() {
    var log = "";

    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

function run() {
    var package = { from: "76712", to: "10012", weigth: "lkg" };

    // the 3 strategies

    var ups = new UPS();
    var usps = new USPS();
    var fedex = new Fedex();

    var shipping = new Shipping();

    shipping.setStrategy(ups);
    log.add("UPS Strategy: " + shipping.calculate(package));
    shipping.setStrategy(usps);
    log.add("USPS Strategy: " + shipping.calculate(package));
    shipping.setStrategy(fedex);
    log.add("Fedex Strategy: " + shipping.calculate(package));

    log.show();
}

run();
