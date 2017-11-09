//"whenever you declare a function inside another function, the inside function(s) is/are
//recreated again each time the outside function is called"

//"Closures are functions that refer to independent (free) variables.
//In other words, the function defined in the closure 'remembers'
//the environment in which it was created."


var addTo = function(passed) {

  var inner = 2;
  return passed + inner;
}

addTo(3) // output 5


// Simple Closure

var passed = 3;

var addTo = function() {

  var inner = 2;
  return passed + inner;
}

addTo(3) // output 5

//

var addTo = function(passed) {  // outer function
  var add = function(inner){    // inner function
      return passed + inner;
  };
  return add;
}


var addThree = new addTo(3);
addThree(1); // output 4

//https://javascript.info/closure
//https://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/

// Two one sentence summaries:
//
// A closure is one way of supporting first-class functions; it is an expression that can reference variables within its scope (when it was first declared), be assigned to a variable, be passed as an argument to a function, or be returned as a function result.
// Or, a closure is a stack frame which is allocated when a function starts its execution, and not freed after the function returns (as if a 'stack frame' were allocated on the heap rather than the stack!).
//
// //https://stackoverflow.com/questions/111102/how-do-javascript-closures-work

http://davidshariff.com/blog/javascript-scope-chain-and-closures/
https://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
