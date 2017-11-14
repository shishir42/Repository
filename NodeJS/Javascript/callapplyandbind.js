var obj = {num : 2};

var addToThis = function(a){
  return this.num + a;
}

var val = addToThis.call(obj, 4);  // functionname.call(obj, functionarguments);

console.log(val);


var arr = [1, 2, 3];
var val1 = addToThis.apply(obj, arr);

console.log(val1);

// bind

var addToThis = function(a, b, c){
  return this.num + a + b + c;
}

var bound = addToThis.bind(obj);

bound(1, 2, 3);

//Call invokes the function and allows you to pass in arguments one by one.
//Apply invokes the function and allows you to pass in arguments as an array.
//Bind returns a new function, allowing you to pass in a this array and any number of arguments.

//Call

var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.call(person1, 'Hello'); // Hello Jon Kuperman
say.call(person2, 'Hello'); // Hello Kelly King

//Apply

var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.apply(person1, ['Hello']); // Hello Jon Kuperman
say.apply(person2, ['Hello']); // Hello Kelly King

//Bind

var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say() {
    console.log('Hello ' + this.firstName + ' ' + this.lastName);
}

var sayHelloJon = say.bind(person1);
var sayHelloKelly = say.bind(person2);

sayHelloJon(); // Hello Jon Kuperman
sayHelloKelly(); // Hello Kelly King


When To Use Each

// Call and apply are pretty interchangeable. Just decide whether it’s easier to send in an array or a comma //separated list of arguments.
//
// I always remember which one is which by remembering that Call is for comma (separated list) and Apply is //for Array.
//
// Bind is a bit different. It returns a new function. Call and Apply execute the current function immediately.
//
// Bind is great for a lot of things. We can use it to curry functions like in the above example. We can take //a simple hello function and turn it into a helloJon or helloKelly. We can also use it for events like //onClick where we don’t know when they’ll be fired but we know what context we want them to have.


Use .bind() when you want that function to later be called with a certain context, useful in events. Use .call() or .apply() when you want to invoke the function immediately, and modify the context.

Call/apply call the function immediately, whereas bind returns a function that, when later executed, will have the correct context set for calling the original function. This way you can maintain context in async callbacks and events.


//program
function sum() {
    return Array.prototype.reduce.call(arguments, function(a, b) {
        return a + b;
    }, 0);
}
If using ES2015 is an option you can have slightly nicer (subjective) implementation:

const sum = (...args) => [...args].reduce((a, b) => a + b, 0);

array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
