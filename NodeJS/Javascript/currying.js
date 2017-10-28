var add = function (a) {
  return function(b){
    return a + b;
  }
};

var addToFive = add(5);
console.log(addToFive(1));
console.log(add(1)(8));

//Currying

//A function which accepts a one or more arguments of func which wither invoked
//when all the arguments are passed or return a function which accepts one or remaining arguments.

var add = function(a){
  return function(b){
    return a + b;
  };
};

add(5)(100) //returns 105

function volume( l, w, h ) {
  return l * w * h;
}
var curried = curry( volume );
curried( 1 )( 2 )( 3 ); // 6
