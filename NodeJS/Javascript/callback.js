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
