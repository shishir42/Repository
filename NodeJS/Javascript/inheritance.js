//-----------------------------------------------------------------------------------------------------------------------------
// Create and define Adult.
function Adult() {}
Adult.prototype.speak = function(){
  alert ('I am an adult!');
};
Adult.prototype.workDay= function(){
  alert ('I have to go to work.');
};

// Create and define Student.
function Student() {
  // Call the Adult function.
  Adult.call(this);
}

// Tell Student to inherit Adult.
Student.prototype = new Adult();

Student.prototype.constructor = Student;

// Change the workDay method.
Student.prototype.workDay= function(){
  alert('I have to do my homework.');
}

// add speakGoodbye method
Student.prototype.speakGoodbye= function(){
  alert('I am going to the library. Goodbye.');
}

var studentA = new Student();
studentA.workDay();
studentA.speak();
studentA.speakGoodbye();

// To check for inheritance:
alert(studentA instanceof Adult);
// Returns true.
alert(studentA instanceof Student);
// Returns true.


//-----------------------------------------------------------------------------------------------------------------------------
//Implement an Animal class, Mammal subclass, Lion subclass. Use pseudoclassical instantiation.

var Animal = function(name) {
  this.name = name;
};

Animal.prototype.see = function() {
    console.log(this.name + " can see");
};

var Mammal = function(legs, name) {
  this.legs = legs;
  Animal.call(this, name);
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.walk = function() {
    console.log("I am walking with " + this.legs + " legs");
};

var Lion = function(weight, legs, name) {
    Mammal.call(this, legs, name);
    this.weight = weight;
};

Lion.prototype = Object.create(Mammal.prototype);
Lion.prototype.constructor = Lion;
Lion.prototype.roar = function() {
    console.log('RAWR!');
};

//Now do that using a prototypal instantiation pattern.

var Animal = function(name) {
    var instance = Object.create(Animal.prototype);
    instance.name = name;
    return instance;
};

Animal.prototype.see = function() {
    console.log(this.name + ' can see');
};

var Mammal = function(name, legs) {
    var instance = Animal(name);
    instance.legs = legs;
    return instance;
};

Mammal.prototype = Object.create(Animal.prototype);

var Lion = function(name, legs, weight) {
    var instance = Mammal(name, legs);
    instance.weight = weight;
    return instance;
};

Lion.prototype = Object.create(Mammal.prototype);
Lion.prototype.roar = function() {
    console.log(this.name + ' is roaring');
};

//usage

var lion = Lion('leon', 4, 400);


//-----------------------------------------------------------------------------------------------------------------------------

var Person = function(name){
  this.name = name;
  this.type = 'human';
}

Person.prototype.info = function(){
  console.log("Name:", this.name, "Type:", this.type);
}

var Robot = function(name){
  Person.apply(this,arguments)
  this.name = name;
  this.type = 'robot';
}

Robot.prototype = Person.prototype;        // Set prototype to Person's
Robot.prototype.constructor = Robot;   // Set constructor back to Robot

person = new Person("Bob");
robot = new Robot("Boutros");

person.info();
// Name: Bob Type: human

robot.info();
// Name: Boutros Type: robot

//-----------------------------------------------------------------------------------------------------------------------------

//The prototype is just an object when you use `Object.create()`
var Base = {};

//This is how you create an instance:
var baseInstance = Object.create(Base);

//If you want to inherit from "Base":
var subInstance = Object.create(Object.create(Base));

//Detect if subInstance is an instance of Base:
console.log(Base.isPrototypeOf(subInstance)); //True

//-----------------------------------------------------------------------------------------------------------------------------

var Base = {};

function createBase() {
  return Object.create(Base, {
    doSomething: {
       value: function () {
         console.log("Doing something");
       },
    },
  });
}

var Sub = createBase();

function createSub() {
  return Object.create(Sub, {
    doSomethingElse: {
      value: function () {
        console.log("Doing something else");
      },
    },
  });
}

var subInstance = createSub();
subInstance.doSomething(); //Logs "Doing something"
subInstance.doSomethingElse(); //Logs "Doing something else"
console.log(Base.isPrototypeOf(subInstance)); //Logs "true"
console.log(Sub.isPrototypeOf(subInstance)); //Logs "true


//-----------------------------------------------------------------------------------------------------------------------------
// ES6
class Vehicle {
   constructor(name) {
      this.name = name;
      this.kind = 'vehicle';
   }
   getName() {
      return this.name;
   }
}

// Create an instance
var myVehicle = new Vehicle('rocky');
myVehicle.getName(); // => 'rocky'
To inherit from a base class, use extends:

class Car extends Vehicle {
   constructor(name) {
      super(name);
      this.kind = 'car'
   }
}

var myCar = new Car('bumpy');

myCar.getName(); // => 'bumpy'
myCar instanceof Car; // => true
myCar instanceof Vehicle; // => true

//-----------------------------------------------------------------------------------------------------------------------------
function SuperHuman (name, superPower) {
    this.name = name;
    this.superPower = superPower;
}

SuperHuman.prototype.usePower = function () {
    console.log(this.superPower + "!");
};

var banshee = new SuperHuman("Silver Banshee", "sonic wail");

// Outputs: "sonic wail!"
banshee.usePower();

//The SuperHuman constructor contains our initialization logic,
//while SuperHuman.prototype contains the methods that are shared across all SuperHuman instances.

//But suppose that we want to create a new type which inherits from SuperHuman while adding its own functionality?
//What would that look like?

function SuperHero (name, superPower) {
    this.name = name;
    this.superPower = superPower;
    this.allegiance = "Good";
}

SuperHero.prototype.saveTheDay = function () {
    console.log(this.name + " saved the day!");
};

var marvel = new SuperHero("Captain Marvel", "magic");

// Outputs: "Captain Marvel saved the day!"
marvel.saveTheDay();


//While this gets us started, there are a couple of problems.
//First of all, the SuperHero constructor is repeating some of the logic of the SuperHuman constructor.
//And more importantly, at this point instances of SuperHero don't have access to SuperHuman methods. For example:

// TypeError: Object <#SuperHero> has no method 'usePower'
marvel.usePower();


//Let's fix those couple of issues.

function SuperHero (name, superPower) {
    // Reuse SuperHuman initialization
    SuperHuman.call(this, name, superPower);

    this.allegiance = "Good";
}

SuperHero.prototype = new SuperHuman();

SuperHero.prototype.saveTheDay = function () {
    console.log(this.name + " saved the day!");
};

var marvel = new SuperHero("Captain Marvel", "magic");

// Outputs: "Captain Marvel saved the day!"
marvel.saveTheDay();

// Outputs: "magic!"
marvel.usePower();


//-----------------------------------------------------------------------------------------------------------------------------
// Define the Person constructor
var Person = function(firstName) {
  this.firstName = firstName;
};

// Add a couple of methods to Person.prototype
Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};

// Define the Student constructor
function Student(firstName, subject) {
  // Call the parent constructor, making sure (using call)
  // that "this" is set correctly during the call
  Person.call(this, firstName);

  // Initialize our Student-specific properties
  this.subject = subject;
}

// Create a Student.prototype object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the
// Student.prototype. That's incorrect for several reasons, not least
// that we don't have anything to give Person for the "firstName"
// argument. The correct place to call Person is above, where we call
// it from Student.
Student.prototype = Object.create(Person.prototype); // See note below

// Set the "constructor" property to refer to Student
Student.prototype.constructor = Student;

// Replace the "sayHello" method
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying "
              + this.subject + ".");
};

// Add a "sayGoodBye" method
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// Example usage:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Check that instanceof works correctly
console.log(student1 instanceof Person);  // true
console.log(student1 instanceof Student); // true

//-----------------------------------------------------------------------------------------------------------------------------

//It's not always necessary, but it does have its uses.
//Suppose we wanted to make a copy method on the base Person class.
//Like this:

// define the Person Class
function Person(name) {
    this.name = name;
}

Person.prototype.copy = function() {
    // return new Person(this.name); // just as bad
    return new this.constructor(this.name);
};

// define the Student class
function Student(name) {
    Person.call(this, name);
}

// inherit Person
Student.prototype = Object.create(Person.prototype);

//Now what happens when we create a new Student and copy it?

var student1 = new Student("trinth");
console.log(student1.copy() instanceof Student); // => false


//The copy is not an instance of Student. This is because (without explicit checks),
//we'd have no way to return a Student copy from the "base" class. We can only return a Person.
//However, if we had reset the constructor:

// correct the constructor pointer because it points to Person
Student.prototype.constructor = Student;

var student1 = new Student("trinth");
console.log(student1.copy() instanceof Student); // => true
