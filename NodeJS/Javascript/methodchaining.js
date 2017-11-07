//function chaining

var obj = function() {
  this.i = 0;

  this.add = function(i) {
    this.i += i;
  }

  this.subtract = function(i) {
    this.i -= i;
  }

  this.print = function() {
    console.log(this.i);
  }
}

var x = new obj();
x.add(3);
x.subtract(2);
x.print();

var obj = function() {
  this.i = 0; // public property

  this.add = function(i) {  // public function
    this.i += i;
    return this;
  }

  this.subtract = function(i) {// public function
    this.i -= i;
    return this;
  }

  this.print = function() { // public function
    console.log(this.i);
  }
}

var x = new obj();
x.add(10).subtract(9).print();


// private property and private methods

var obj = function() {
  var i = 0; // private property

  var add = function(j) {  // private method
    i += j;
    return this;
  }

  var subtract = function(j) {// private method
     i -= j;
    return this;
  }

  var print = function() { // private method
    console.log(i);
  }

  return {add: add, subtract : subtract, print: print};
}

var x = new obj();
x.add(10).subtract(9).print();  // 1

var x = obj();
x.add(10).subtract(9).print();  // 1

http://davidshariff.com/blog/chaining-variable-assignments-in-javascript-words-of-caution/
