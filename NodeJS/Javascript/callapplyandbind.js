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
