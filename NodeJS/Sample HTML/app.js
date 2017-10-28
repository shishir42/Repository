// base class
var Job = function(){
  this.pays = true;
}

// prototype method
Job.prototype.print = function () {
  console.log(this.pays ? "Base Class -- Please Hire Me!!!" : "No thanks");
};

// Subclass
var TechJob = function(title, pays){
  Job.call(this);
  this.title = title;
  this.pays = pays;
}


TechJob.prototype = Object.create(Job.prototype);
TechJob.prototype.constructor = TechJob;

TechJob.prototype.print = function () {
  console.log(this.pays ? this.title + "Derived Class -- Please Hire Me!!!" : "No thanks");
};

var softwarePosition1 = new TechJob("JS", true);
var softwarePosition2 = new TechJob("Swift", true);

console.log(softwarePosition1.print());
console.log(softwarePosition2.print());

// Declaring our Animal object
var Animal = function () {

    this.name = 'unknown';

    this.getName = function () {
        return this.name;
    }

    return this;
};

// Declaring our Dog object
var Dog = function () {

    // A private variable here
    var private = 42;

    // overriding the name
    this.name = "Bello";

    // Implementing ".bark()"
    this.bark = function () {
        return 'MEOW';
    }

    return this;
};


// Dog extends animal
Dog.prototype = new Animal();

// -- Done declaring --

// Creating an instance of Dog.
var dog = new Dog();

// Proving our case
console.log(
    "Is dog an instance of Dog? ", dog instanceof Dog, "\n",
    "Is dog an instance of Animal? ", dog instanceof Animal, "\n",
    dog.bark() +"\n", // Should be: "MEOW"
    dog.getName() +"\n", // Should be: "Bello"
    dog.private +"\n" // Should be: 'undefined'
);
