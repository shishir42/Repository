// var vs let
// var - begining and let introduced in ES6
// var - function scope and let - block scope
// var - get hoisted and let - not hoisted


// ==  vs ===
//comparsion operator
// == compare values & === compare value and type


// let vs const
// const define constant

// undefined vs null
// both represent empty value
// typeof undefined - undefined
// typeof null -object


//prototype inheritance

// function declaration and function expression


// promise - make async call

var p1 = new Promise(function(resolve, reject){
  resolve($.ajax('url'));
});

p1.then(function(r){
  return new Promise()
}).then(function(result){
  $("#div").html(result);
});


// setTimeout()

setTimeout(function(){
  console.log("a");
}, 0);

console.log("b");
console.log("c");

// o/ p - b c a
