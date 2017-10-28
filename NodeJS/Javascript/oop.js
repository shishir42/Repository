// Constructors
let add = function(n1 + n2){
  return n1 + n2;
}

let sum = add(3, 4);

let car = function(color){
  this.color = color;
}

let redCar = new car('red');
console.log(redCar.color);

let blueCar = new car('blue');
console.log(blueCar.color);

// Constructors calling without new keyword
let yellowCar = car('yellow');

// This is just function call, need to return something


let car = function(color){
  if(!new.target){
    throw 'Car() must be called with new keyword';
  }
  this.color = color;
}

// make private
let car = function(color){
  if(!new.target){
    throw 'Car() must be called with new keyword';
  }
  this.setColor = function(_color){
    color = _color;
  }

  this.getColor = function(){
    return color;
  }
}


let redCar = new car('red');
console.log(redCar.getColor());

//prototype

let car = function(color){
  this.color = color;
}

car.prototypegetColor = function(){
  return color;
}

let redCar = new car('red');
console.log(redCar.color);

// To overide toString function

Object.prototype.toString = function(){
  return 'color: ${this.color}';
}

// Object.create(prototypeObject, propertyObject); - To extend constructor

const myObject = Object.create(Object.prototype);
const myLiteral = {};
const noPrototype = Object.create(null);

console.dir(myObject);
console.dir(myLiteral);
console.dir(noPrototype);

const car = function(color){
  this.color = color;
}

const car1 = new car('red');
const car2 = Object.create(car1.prototype);

console.dir(car1);
console.dir(car2);


car.prototype = function(){
  getColor(){
    return this.color;
  }
}


const toyCar = function(){
}

toyCar.prototype = Object.create(car.prototype);
const toycar1 = new toyCar();
console.dir(toycar1);

console.dir(toycar1 instanceof toyCar);
console.dir(toycar1 instanceof car);
console.dir(toycar1 instanceof Object);


// prototype chain

//Prototype chaining is used to build new types of objects based on existing ones.
//It has a very similar job to inheritance in a class based language.

//Constructor functions have a property called prototype.
//Adding properties and methods to the prototype property will automatically
//add the method or property to all objects created by the constructor function.

//Prototype chaining is an extension of this idea. The prototype property is just a regular
//javascript object so it’s possible to create a function’s prototype using another constructor function.
//When you do this, all of the properties and methods from the constructor function’s
//prototype are automatically added to new the prototype object.
//This makes it easy to create a constructor function that builds objects
//that are an extended version of an existing one.


// Car constructor
const Car = function() {};

// Set Car's prototype
Car.prototype = {
  print() {
    return 'this is a Car';
  }
};

// ToyCar constructor
const ToyCar = function() {};

// Set ToyCar's prototype to be Car's prototype
ToyCar.prototype = Object.create(Car.prototype);

// Adding ToyCar's own prototype print method
ToyCar.prototype.print = function(){
	return 'this is a ToyCar';
}
// Creating LegoCar object from ToyCar constructor
const legoCar = new ToyCar();

console.log(legoCar);


-----------------------------------------------------------


// Car constructor
const Car = function() {};

// Set Car's prototype
Car.prototype = {
  print() {
    return 'this is a Car';
  }
};

// ToyCar constructor
const ToyCar = function() {};

// Set ToyCar's prototype to be Car's prototype
ToyCar.prototype = Object.create(Car.prototype);

// Adding ToyCar's own prototype print method
ToyCar.prototype.print = function(){
	return 'this is a ToyCar';
}

const ToyTransformer = function() {};

// Set ToyCar's prototype to be Car's prototype
ToyTransformer.prototype = Object.create(ToyCar.prototype);

// Adding ToyCar's own prototype print method
ToyTransformer.prototype.print = function(){
	return 'this is a ToyTransformer';
};


-----------------------------------------------------------

// Car constructor
const Car = function() {};

// Set Car's prototype
Car.prototype = {
  print() {
    return 'this is a Car';
  }
};

// ToyCar constructor
const ToyCar = function() {};

// Set ToyCar's prototype to be Car's prototype
ToyCar.prototype = Object.create(Car.prototype);

// Adding ToyCar's own print method
ToyCar.prototype.print = function(){
	return 'this is a ToyCar';
}

const ToyTransformer = function() {};

// Set ToyCar's prototype to be Car's prototype
ToyTransformer.prototype = Object.create(ToyCar.prototype);

// Adding ToyCar's own print method
ToyTransformer.prototype.print = function(){
	return 'this is a ToyTransformer';
};

const toyota = new Car();
const legoCar = new ToyCar();
const optimusPrime = new ToyTransformer();

console.log(toyota.print());
console.log(legoCar.print());
console.log(optimusPrime.print());

--------------------------------------------------------
//Extending Function Constructors

let Mammal = function(legs){
  this.legs = legs;
}

Mammal.prototype = function () {
  function walk(){
    return 'walking';
  }
  function sleep(){
    return 'sleep';
  }
};

let Bat = function(legs, isVegetarian){
  Mammal.call(this, legs);
  this.isVegetarian = isVegetarian;

}

Bat.prototype = Object.create(Mammal.prototype);
Bat.prototype.constructor = Bat;
Bat.prototype.fly = function(){
  return "fly";
}

var fruitBat = new Bat(4, true);
console.log(fruitBat.sleep());
console.log(fruitBat.fly());
console.log(fruitBat.walk());

--------------------------------------------------------
//Object.setPrototypeOf() Method
//Object.setPrototypeOf(destinationObject, sourceObject);


let toyota = {
  drive() {
    return 'driving toyota';
  }
}

let camry = {
  wifi() {
    return 'using wifi';
  }
}

// Set toyota's __proto__ to camry's  __proto__'s  __proto__
Object.setPrototypeOf(camry, toyota);

console.dir(camry); //prints the camry object
console.log(camry.wifi()); // using wifi
console.log(camry.drive()); // driving toyota

--------------------------------------------------------
//Object.assign() Method

let toyota = {
  drive() {
    return 'driving toyota';
  }
  break(){
    return 'break toyota';
  }
}

let camry = {
  wifi(){
    return 'using wifi';
  }
}

Object.assign(camry, toyota); //shallow copy
console.log(camry.driver()); //driving toyota

Object.create(toyota, {
  wifi(){return 'using wifi';}, color(){return 'red';}
});
