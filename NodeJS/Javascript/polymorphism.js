/*
  Polymorphism means "many forms" and in programming describes the ability
  for objects to present the same interface for different behaviors. So calling
  man.sayHello() and woman.sayHello() would result in different output, even
  though the method call is the same.
*/

function Person(gender) {
  this.gender = gender;
  this.sayHello = function () {
    console.log("Hello, I am a " + this.gender);
  }
}

var man = new Person("man");
var woman = new Person("woman");
man.sayHello(); // --> "Hello, I am a man"
woman.sayHello(); // --> "Hello, I am a woman"
