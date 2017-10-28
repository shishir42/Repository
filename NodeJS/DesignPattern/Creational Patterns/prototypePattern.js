//The Prototype Pattern creates new objects, but rather than creating non-initialized objects
//it returns objects that are initialized with values it copied from a prototype - or sample - object.
//The Prototype pattern is also referred to as the Properties pattern.

//An example of where the Prototype pattern is useful is the initialization of business objects with values
//that match the default values in the database. The prototype object holds the default values that
//are copied over into a newly created business object.

//Classical languages rarely use the Prototype pattern, but JavaScript being a prototypal language uses
//this pattern in the construction of new objects and their prototypes.

function CustomerPrototype(proto) {
    this.proto = proto;

    this.clone = function () {
        var customer = new Customer();

        customer.first = proto.first;
        customer.last = proto.last;
        customer.status = proto.status;

        return customer;
    };
}

function Customer(first, last, status) {

    this.first = first;
    this.last = last;
    this.status = status;

    this.say = function () {
        console.log("name: " + this.first + " " + this.last + ", status: " + this.status);
    };
}

function run() {

    var proto = new Customer("Shishir", "Roy", "pending");
    var prototype = new CustomerPrototype(proto);

    var customer = prototype.clone();
    customer.say();
}

run();
