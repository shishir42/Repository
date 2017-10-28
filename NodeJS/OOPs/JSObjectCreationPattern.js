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
