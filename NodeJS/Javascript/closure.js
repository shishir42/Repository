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
