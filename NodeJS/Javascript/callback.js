let x = function(){
    console.log("x");
}

let y = function(callback){
  console.log("y");
  callback();
}

y(x);

//

let add = function(a, b){
  return a + b;
}

let calc = function(num1, num2, callback){
  return callback(num1, num2);
}

console.log(calc(2, 3, add));

//

var myarr = [{num: 22, str: 'z'}, {num: 12, str: 'y'}, {num: 2, str: 'x'}];
myarr.sort(function(x1, x2){
  if(x1.str < x2.str){
    return -1;
  }else{
    return 1;
  }
});

console.log(myarr);

// callback function, also known as a higher-order function, is a function that is passed to another function (let’s call this other function “otherFunction”) as a parameter, and the callback function is called (or executed) inside the otherFunction. A callback function is essentially a pattern (an established solution to a common problem), and therefore, the use of a callback function is also known as a callback pattern.
