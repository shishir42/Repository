// constructor pattern
// factory pattern
// prototype pattern
// dynamic prototype pattern

// factory pattern

var peopleFactory = function(name, age, state){
   var temp = {};

   temp.name = name;
   temp.age = age;
   temp.state = state;
   temp.printPerson = function(){
     console.log(this.name + " , " + this.age + " , " + this.state);
   };

   return temp;
}

var person1 = peopleFactory('abc', 25, 'abc1');
var person2 = peopleFactory('xyz', 27, 'xyz1');

person1.printPerson();
person2.printPerson();

// constructor pattern

var peopleConstructor = function(name, age, state){
  this.name = name;
  this.age = age;
  this.state = state;
  this.printPerson = function(){
    console.log(this.name + " , " + this.age + " , " + this.state);
  };
}

var person1 = new peopleConstructor('abc', 25, 'abc1');
var person2 = new peopleConstructor('xyz', 27, 'xyz1');

person1.printPerson();
person2.printPerson();

// problem with constructor is reduncdency in property and method of multiple objects

// To solve this problem used prototype pattern

// prototype pattern

// Two ways to create methods
Pizza.getCrust = function(){
  return this.crust;
}

Pizza.prototype.getCrust = function(){
  return this.crust;
}

var peopleProto = function(){};

peopleProto.prototype.age = 0;
peopleProto.prototype.name = "no name";
peopleProto.prototype.city = "no city";

peopleProto.prototype.printPerson = function(){
  console.log(this.name + " , " + this.age + " , " + this.city);
};

var person1 = new peopleProto();
person1.name = "abc";
person1.age = 24;
person1.city = "xyz";

person1.printPerson();

console.log('name' in person1); // true it will check for top level data
console.log('name123' in person1); // false

console.log(person1.hasOwnProperty('name')); // true it will check exact data

// dynamic prototype pattern

var peopleDynamicProto = function(name, age, state){
  this.name = name;
  this.age = age;
  this.state = state;


  if(typeof this.printPerson!== 'function'){

    peopleDynamicProto.prototype.printPerson = function(){
      console.log(this.name + " , " + this.age + " , " + this.state);
    };
  }
}

var person1 = new peopleDynamicProto('shishir', 29, 'Karnataka');
person1.printPerson();



//Factories create an object and returns it. That is about it.
//The object that is created stands alone and the best part about this is you can use that object and
//not be effected by what happens to the other objects. This is know as a singleton.

var Car = function(){
    var car = {};
    car.running = false;
    car.toggleEngine = function(){
        this.running = !this.running;
    }
    return car;
};

car1 = Car(); // running false
car2 = Car(); // running false
car1.toggleEngine(); // running true
car2.toggleEngine = undefined; // to broke down.
car1.toggleEngine(); //running false

//Constructors add code to the function so you have a link to the prototype of the object constructor.
//The nice part about this additional link is to use the functional shared technique which looks
//like this.

var Car = function (){
    this.running = false;
};
Car.prototype.toggleEngine = function(){
    this.running = !this.running;
}
var car1 = new Car; //running false
var car2 = new Car; //running false

car2.toggleEngine() //running true
Car.prototype.toggleEngine = function(){};
car1.toggleEngine() //running false

//As we can see after the objects were created they still were very much linked together.

//To be clear you can still do the following and not effect the objects created by the constructor.
//With functional shared method and mask the prototype function given by the constructor.
//So there are not fully linked but they are linked through the constructors prototype.

var car1 = new Car; //running false
var car2 = new Car; //running false

car2.toggleEngine() //running true
car2.toggleEngine = function(){};
car1.toggleEngine() //running true


//The basic difference is that a constructor function is used with the new keyword
//(which causes JavaScript to automatically create a new object, set this within
//the function to that object, and return the object):

var objFromConstructor = new ConstructorFunction();
A factory function is called like a "regular" function:

var objFromFactory = factoryFunction();

//But for it to be considered a "factory" it would need to return a new instance of some object:
//you wouldn't call it a "factory" function if it just returned a boolean or something.
//This does not happen automatically like with new, but it does allow more flexibility for some cases.

//In a really simple example the functions referenced above might look something like this:

function ConstructorFunction() {
   this.someProp1 = "1";
   this.someProp2 = "2";
}
ConstructorFunction.prototype.someMethod = function() { /* whatever */ };

function factoryFunction() {
   var obj = {
      someProp1 : "1",
      someProp2 : "2",
      someMethod: function() { /* whatever */ }
   };
   // other code to manipulate obj in some way here
   return obj;
}

//https://stackoverflow.com/questions/8698726/constructor-function-vs-factory-functions

(
