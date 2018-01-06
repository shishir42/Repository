// Async Flow Control:
//  - callback
//  - promises
//  - generators
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">

//var $ = require('jQuery');

var fruits = ["apple", "banana", "mango"];
fruits.forEach(function(value){
  console.log(value);
});

var promise = get("data/tweets.json");
promise.then(function(data){
  console.log("Success");
}).catch(function(error){
  console.log("Failed");
});


function get(url){
  return new Promise(function(resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.onload = function(){
        if(xhttp.status === 200){
          resolve(JSON.parse(xhttp.response));
        }else{
          reject(xhttp.statusText);
        }
      };

      xhttp.onerror = function(){
        reject(xhttp.statusText);
      };

      xhttp.send();
  });
}

// $.get("data/tweets.json").then(function(data){
//   console.log("First");
//   return $.get("data/tweets.json");
// }).then(function(){
//   console.log("Second");
//   return $.get("data/tweets.json");
// }).then(function(){
//   console.log("Third");
// });
