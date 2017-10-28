(function(i){
  return i + 1;
})(j);

(function(i){
  return i + 1;
}(j));

!function () {}();
+function () {}();

// usage

//private methods
(function($){

  $(this).addClass('MyClass');

})(window.JQuery);

// simple library

var counter = (function(){
  var i = 0;
  return {
    get: function() {
      return i;
    },
    set: function(val){
      i = val;
    },
    increment: function(){
      i++;
    }
  }
})();

// not accessable to variable "i"

console.log(counter.get());
counter.set(6);
counter.increment();
console.log(counter.get());
