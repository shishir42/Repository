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


-------------------------inheritance pattern---------------------
http://davidshariff.com/blog/javascript-inheritance-patterns/

JavaScript Inheritance Patterns

In this post, I am going to introduce to you 3 different ways of how you can implement inheritance in JavaScript. You will see inheritance implemented in languages such as Java by allowing a class to inherit state and behavior from a superclass, where each superclass can have many subclasses.

This means that in Java an object is an instance of a class, which can inherit other classes. Now in JavaScript, being prototypal by nature, an object can inherit from an object.

For the rest of this post, I will introduce the Pseudoclassical, Functional and Prototypal inheritance patterns in JavaScript.

Pseudoclassical pattern

The Pseudoclassical pattern tries to replicate inheritance in a way that is familiar to those who come from a Java or C like background. By using Pseudoclassical inheritance, we attempt to recreate classic programming language’s behavior by using class wide inheritance and where objects are instances of those classes.

A pattern which uses a constructor function and the new operator, combined with a prototype added to the constructor is said to be Pseudoclassical.

In JavaScript, one way to do this inheritance is:

Invoke a constructor function.
Point a child’s prototype to the parent’s prototype for inheritance to occur.
/**
 * Point a child's prototype to a parent's prototype
 **/
var extendObj = function(childObj, parentObj) {
    childObj.prototype = parentObj.prototype;
};

// base human object
var Human = function() {};
// inhertiable attributes / methods
Human.prototype = {
    name: '',
    gender: '',
    planetOfBirth: 'Earth',
    sayGender: function () {
        alert(this.name + ' says my gender is ' + this.gender);
    },
    sayPlanet: function () {
        alert(this.name + ' was born on ' + this.planetOfBirth);
    }
};

// male
var Male = function (name) {
    this.gender = 'Male';
    this.name = 'David';
};
// inherits human
extendObj(Male, Human);

// female
var Female = function (name) {
    this.name = name;
    this.gender = 'Female';
};
// inherits human
extendObj(Female, Human);

// new instances
var david = new Male('David');
var jane = new Female('Jane');

david.sayGender(); // David says my gender is Male
jane.sayGender(); // Jane says my gender is Female

Male.prototype.planetOfBirth = 'Mars';
david.sayPlanet(); // David was born on Mars
jane.sayPlanet(); // Jane was born on Mars
As expected, we have achieved inheritance in a Pseudoclassical manner, however, this solution has a problem. If you look at the last line, you will see the alert says Jane was born on Mars, but what we really want it to say is Jane was born on Earth. The reason for this is the Male prototype was changed to “Mars”.

Given the direct link between the Male and Human prototype, if Human has many children inheriting from it, any change on a child’s prototype properties will affect Human, and thus all children inheriting from  Human. Changing a child’s prototype should not affect other children inheriting from the same parent. The reason for this is because JavaScript passes objects by reference, not by value, meaning all children of  Human inherit changes occurred on other children’s prototypes.

childObj.prototype = parentObj.prototype does give us inheritance. However, if you want to fix the issue above, you need to replace the extendObj function to take the child’s prototype and link it to a temporary object, whose prototype is the parent object’s prototype. In this way, by creating a temporary “middle” object, you allow the temporary object to be empty and inherit its properties from Human.

By doing this, you have solved the pass by reference issue with a new instance of an empty object, which still inherits from the parent, but is not affected by other children.

To understand this clearly, the image below shows the flow of the extendObj function.

classical inheritance

Now, if you ran the same code again, but with the changes in extendObj below, you would see “Jane was born on Earth” was alerted.

/**
 * Create a new constructor function, whose prototype is the parent object's prototype.
 * Set the child's prototype to the newly created constructor function.
 **/
var extendObj = function(childObj, parentObj) {
    var tmpObj = function () {}
    tmpObj.prototype = parentObj.prototype;
    childObj.prototype = new tmpObj();
    childObj.prototype.constructor = childObj;
};

// base human object
var Human = function () {};
// inhertiable attributes / methods
Human.prototype = {
    name: '',
    gender: '',
    planetOfBirth: 'Earth',
    sayGender: function () {
        alert(this.name + ' says my gender is ' + this.gender);
    },
    sayPlanet: function () {
        alert(this.name + ' was born on ' + this.planetOfBirth);
    }
};

// male
var Male = function (name) {
    this.gender = 'Male';
    this.name = 'David';
};
// inherits human
extendObj(Male, Human);

// female
var Female = function (name) {
    this.name = name;
    this.gender = 'Female';
};
// inherits human
extendObj(Female, Human);

// new instances
var david = new Male('David');
var jane = new Female('Jane');

david.sayGender(); // David says my gender is Male
jane.sayGender(); // Jane says my gender is Female

Male.prototype.planetOfBirth = 'Mars';
david.sayPlanet(); // David was born on Mars
jane.sayPlanet(); // Jane was born on Earth
Functional pattern

Another pattern you can use to achieve inheritance in JavaScript is by Douglas Crockford, called Functional inheritance. This pattern allows one object to inherit from another, take the result and augment it at the child level to achieve inheritance. What this really means, is you create an object as your parent, pass the child object to the parent to inherit / apply its properties, and return the resulting object back to the child, who can then augment its own properties to the object returned from the parent.

Below is the same example used above to explain Pseudoclassical inheritance, but written in a functional nature.

var human = function(name) {
    var that = {};

    that.name = name || '';
    that.gender = '';
    that.planetOfBirth = 'Earth';
    that.sayGender = function () {
        alert(that.name + ' says my gender is ' + that.gender);
    };
    that.sayPlanet = function () {
        alert(that.name + ' was born on ' + that.planetOfBirth);
    };

    return that;
}

var male = function (name) {
    var that = human(name);
    that.gender = 'Male';
    return that;
}

var female = function (name) {
    var that = human(name);
    that.gender = 'Female';
    return that;
}

var david = male('David');
var jane = female('Jane');

david.sayGender(); // David says my gender is Male
jane.sayGender(); // Jane says my gender is Female

david.planetOfBirth = 'Mars';
david.sayPlanet(); // David was born on Mars
jane.sayPlanet(); // Jane was born on Earth
As you can see by using this pattern, there is no need to use the prototype chain, constructors or the “new” keyword. Functional inheritance achieves this by passing a unique object around every time an instance of the function is called.

This however, has a downside for performance because each object is unique, meaning each function call creates a new object, so the JavaScript interpreter has to assign new memory to the function in order to recompile everything inside of it as unique again.

There are also benefits to this approach, as the closures of each function allow for good use of public and private methods / attributes. Let’s take this code for example, which shows a parent class of vehicle and children classes of motorbike and boat.

var vehicle = function(attrs) {
    var _privateObj = {
        hasEngine: true
    },
    that = {};

    that.name = attrs.name || null;
    that.engineSize = attrs.engineSize || null;
    that.hasEngine = function () {
        alert('This ' + that.name + ' has an engine: ' + _privateObj.hasEngine);
    };

    return that;
}

var motorbike = function () {

    // private
    var _privateObj = {
        numWheels: 2
    },

    // inherit
    that = vehicle({
        name: 'Motorbike',
        engineSize: 'Small'
    });

    // public
    that.totalNumWheels = function () {
        alert('This Motobike has ' + _privateObj.numWheels + ' wheels');
    };

    that.increaseWheels = function () {
        _privateObj.numWheels++;
    };

    return that;

};

var boat = function () {

    // inherit
    that = vehicle({
        name: 'Boat',
        engineSize: 'Large'
    });

    return that;

};

myBoat = boat();
myBoat.hasEngine(); // This Boat has an engine: true
alert(myBoat.engineSize); // Large

myMotorbike = motorbike();
myMotorbike.hasEngine(); // This Motorbike has an engine: true
myMotorbike.increaseWheels();
myMotorbike.totalNumWheels(); // This Motorbike has 3 wheels
alert(myMotorbike.engineSize); // Small

myMotorbike2 = motorbike();
myMotorbike2.totalNumWheels(); // This Motorbike has 2 wheels

myMotorbike._privateObj.numWheels = 0; // undefined
myBoat.totalNumWheels(); // undefined
You can see that it is fairly easy to provide encapsulation. The _privateObj can not be modified from outside of the object, unless exposed by a public method like increaseWheels(). Similarly, private values can also only be read when exposed by a public method, such as motorbike’s totalNumWheels() function.

Prototypal pattern

You can also implement inheritance in JavaScript using a pure prototypal approach which is more suited to the language.
As of ECMAScript 5, it is possible to create an inherited object by simply doing the following:

var male = Object.create(human);
However, support is not so good for older browsers, thankfully you can augment the Object with a create method should it not exist already, which will have the same behavior as that of ECMAScript 5.

(function () {
    'use strict';

    /***************************************************************
     * Helper functions for older browsers
     ***************************************************************/
    if (!Object.hasOwnProperty('create')) {
        Object.create = function (parentObj) {
            function tmpObj() {}
            tmpObj.prototype = parentObj;
            return new tmpObj();
        };
    }
    if (!Object.hasOwnProperty('defineProperties')) {
        Object.defineProperties = function (obj, props) {
            for (var prop in props) {
                Object.defineProperty(obj, prop, props[prop]);
            }
        };
    }
    /*************************************************************/

    var human = {
        name: '',
        gender: '',
        planetOfBirth: 'Earth',
        sayGender: function () {
            alert(this.name + ' says my gender is ' + this.gender);
        },
        sayPlanet: function () {
            alert(this.name + ' was born on ' + this.planetOfBirth);
        }
    };

    var male = Object.create(human, {
        gender: {value: 'Male'}
    });

    var female = Object.create(human, {
        gender: {value: 'Female'}
    });

    var david = Object.create(male, {
        name: {value: 'David'},
        planetOfBirth: {value: 'Mars'}
    });

    var jane = Object.create(female, {
        name: {value: 'Jane'}
    });

    david.sayGender(); // David says my gender is Male
    david.sayPlanet(); // David was born on Mars

    jane.sayGender(); // Jane says my gender is Female
    jane.sayPlanet(); // Jane was born on Earth
})();
Summary

So today we have covered 3 different ways that you can implement inheritance in JavaScript. Most people are aware of prototypes, but as we have seen today, the Pseudoclassical and Functional patterns are just as valid.

Which pattern you should use varies depending on your project, there is no real “1 fits all” solution, so you are best to choose 1 you feel is the most suitable.

-------------------------------------------------------------------


//3 Different Kinds of Prototypal Inheritance: ES6+ Edition

JavaScript is one of the most expressive programming languages ever created. One of its best features is the ability to create and inherit from objects without classes and class inheritance.

Its combination of delegate prototypes, runtime object extension, and closures allow you to express three distinct kinds of prototypes in JavaScript, which provide significant advantages over classical inheritance.


Delegation / Differential Inheritance
A delegate prototype is an object that serves as a base for another object. When you inherit from a delegate prototype, the new object gets a reference to the prototype.

When you try to access a property on the new object, it checks the object’s own properties first. If it doesn’t find it there, it checks the `[[Prototype]]`, and so on up the prototype chain until it gets back to `Object.prototype`, which is the root delegate for most objects.

https://cdn-images-1.medium.com/max/1600/1*wgVmoipm1IhKMDluvwuW4Q.png

Method delegation can preserve memory resources because you only need one copy of each method to be shared by all instances. There are several ways to set up the relationship in JavaScript. The one you’re likely to see in ES6 goes something like this:


class Greeter {
  constructor (name) {
    this.name = name || 'John Doe';
  }
  hello () {
    return `Hello, my name is ${ this.name }`;
  }
}

const george = new Greeter('George');

const msg = george.hello();

console.log(msg); // Hello, my name is George

Due to the many problems associated with classical inheritance, and the temptation to extend classes, I don’t recommend this technique. I present it here only because it’s likely to be a familiar point of reference.
You may also be familiar with the ES5 constructor function version:


function Greeter (name) {
  this.name = name || 'John Doe';
}

Greeter.prototype.hello = function hello () {
  return 'Hello, my name is ' + this.name;
}

var george = new Greeter('George');

var msg = george.hello();

console.log(msg); // Hello, my name is George

I prefer a factory function using `Object.create()`. (In JavaScript, any function can create new objects. When it’s not a constructor function, it’s called a factory function):

const proto = {
  hello () {
    return `Hello, my name is ${ this.name }`;
  }
};

const greeter = (name) => Object.assign(Object.create(proto), {
  name
});

const george = greeter('george');

const msg = george.hello();

console.log(msg);

You can avoid property delegation by setting the prototype to `null` using `Object.create(null)`.
One major drawback to delegation is that it’s not very good for storing state. If you try to store state as objects or arrays, mutating any member of the object or array will mutate the member for every instance that shares the prototype. In order to preserve instance safety, you need to make a copy of the state for each object.

//Concatenative Inheritance / Cloning / Mixins
Concatenative inheritance is the process of copying the properties from one object to another, without retaining a reference between the two objects. It relies on JavaScript’s dynamic object extension feature.
Cloning is a great way to store default state for objects: This process is commonly achieved using `Object.assign()`. Prior to ES6, it was common to use similar `.extend()` methods from Lodash, Underscore, or jQuery.

const proto = {
  hello: function hello() {
    return `Hello, my name is ${ this.name }`;
  }
};

const george = Object.assign({}, proto, {name: 'George'});

const msg = george.hello();

console.log(msg); // Hello, my name is George

It’s common to see this style used for mixins. For example, you can turn any object into an event emitter by mixing in an `EventEmitter3` prototype:

import Events from 'eventemitter3';

const object = {};

Object.assign(object, Events.prototype);

object.on('event', payload => console.log(payload));

object.emit('event', 'some data'); // 'some data'


We can use this to create a Backbone-style event emitting model:

import Events from 'eventemitter3';

const modelMixin = Object.assign({
  attrs: {},
  set (name, value) {
    this.attrs[name] = value;

    this.emit('change', {
      prop: name,
      value: value
    });
  },

  get (name) {
    return this.attrs[name];
  }
}, Events.prototype);


const george = { name: 'george' };
const model = Object.assign(george, modelMixin);

model.on('change', data => console.log(data));

model.set('name', 'Sam');
/*
{
  prop: 'name',
  value: 'Sam'
}
*/

Concatenative inheritance is very powerful, but it gets even better when you combine it with closures.
Functional Inheritance

Not to be confused with functional programming.

Coined by Douglas Crockford in “JavaScript: The Good Parts”. Functional inheritance makes use of a factory function, and then tacks on new properties using concatenative inheritance.

Functions created for the purpose of extending existing objects are commonly referred to as functional mixins. The primary advantage of using functions for extension is that it allows you to use the function closure to encapsulate private data. In other words, you can enforce private state.

It’s a bit awkward to hang the attributes on a public property where a user could set or get them without calling the proper methods. What we really want to do is hide the attributes in a private closure

import Events from 'eventemitter3';

const rawMixin = function () {
  const attrs = {};

  return Object.assign(this, {
    set (name, value) {
      attrs[name] = value;

      this.emit('change', {
        prop: name,
        value: value
      });
    },

    get (name) {
      return attrs[name];
    }
  }, Events.prototype);
};

const mixinModel = (target) => rawMixin.call(target);

const george = { name: 'george' };
const model = mixinModel(george);

model.on('change', data => console.log(data));

model.set('name', 'Sam');
/*
{
  prop: 'name',
  value: 'Sam'
}
*/

By moving `attrs` from a public property to a private identifier, we remove all trace of it from the public API. The only way to use it now is via the privileged methods. Privileged methods are any methods defined within the closure’s function scope, which gives them access to the private data.

Note in the example above, we have the `mixinModel()` wrapper around the actual functional mixin, `rawMixin()`. The reason we need that is because we need to set the value of `this` inside the function, which we do with `Function.prototype.call()`.

//Composition Over Class Inheritance

“Favor object composition over class inheritance.” ~ The Gang of Four, “Design Patterns: Elements of Reusable Object Oriented Software”

Classical inheritance creates is-a relationships with restrictive taxonomies, all of which are eventually wrong for new use-cases. But it turns out, we usually employ inheritance for has-a, uses-a, or can-do relationships.

Composition is more like a guitar effects pedalboard. Want something that can do delay, subtle distortion, and a robot voice? No problem! Just plug them all in:

const effect = compose(delay, distortion, robovoice); // Rock on!

When would you want to use class inheritance? For me, the answer is simple: “Never.”

Composition is:

Simpler
More expressive
More flexible

http://davidshariff.com/blog/javascript-inheritance-patterns/
https://medium.com/javascript-scene/3-different-kinds-of-prototypal-inheritance-es6-edition-32d777fa16c9
https://ericleads.wordpress.com/2013/02/11/fluent-javascript-three-different-kinds-of-prototypal-oo/
http://davidshariff.com/blog/javascript-inheritance-patterns/
https://artandlogic.com/2012/07/prototypal-vs-functional-inheritance-in-javascript/
http://julien.richard-foy.fr/blog/2011/10/30/functional-inheritance-vs-prototypal-inheritance/
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
http://www.bolinfest.com/javascript/inheritance.php
https://www.youtube.com/results?search_query=different+types+of+inheritance+in+javascript
