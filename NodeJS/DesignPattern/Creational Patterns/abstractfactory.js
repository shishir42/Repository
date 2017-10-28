function Employee(name) {
    this.name = name;

    this.say = function () {
        log.add("I am employee " + name);
    };
}

function EmployeeFactory() {

    this.create = function(name) {
        return new Employee(name);
    };
}

function Vendor(name) {
    this.name = name;

    this.say = function () {
        log.add("I am vendor " + name);
    };
}

function VendorFactory() {

    this.create = function(name) {
        return new Vendor(name);
    };
}

// log helper
var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));

    for (var i = 0, len = persons.length; i < len; i++) {
        persons[i].say();
    }

    log.show();
}

run();


//Provide an interface for creating families of related or dependent
//objects without specifying their concrete classes.

//An Abstract Factory creates objects that are related by a common theme.
//In object-oriented programming a Factory is an object that creates other objects.
//An Abstract Factory has abstracted out a theme which is shared by the newly created objects.

//Suppose we have two Abstract Factories whose task it is to create page controls,
//such as, buttons, textboxes, radio buttons, and listboxes. One is the Light Factory which
//creates controls that are white and the other the Dark Factory which creates controls
//that are black. Both Factories creates the same types of controls, but they differ in color,
//which is their common theme. This is an implementation of the Abstract Factory pattern.

//Over time the Abstract Factory and Factory Method patterns have merged into a more general pattern
//called Factory. A Factory is simply an object that creates other objects.

//You may be wondering why you would want to leave the responsibility of the construction of
//objects to others rather than simply calling a constructor function with the new keyword directly.
//The reason is that that constructor functions are limited in their control over
//the overall creation process and sometimes you will need to hand over control
//to a factory that has broader knowledge.

//This includes scenarios in which the creation process involves object caching, sharing or
//re-using of objects, complex logic, or applications that maintain object and type counts,
//and objects that interact with different resources or devices. If your application needs more
// control over the object creation process, consider using a Factory.
