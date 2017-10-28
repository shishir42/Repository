// configure a property

var obj = {};

// obj.somthing = "some property";

Object.defineProperty(obj, "color", {configurable: true, value: "blue", enumerable: true, writable: true});


for(var prop in obj){
  console.log(obj[prop]);
}

// setter and getter

function Car(){
  var theColor;
  Object.defineProperty(this, 'color', {
    get: function() {
      console.log("Getter " + theColor);
      return theColor;
    },
    set: function(value) {
      theColor = value;
      console.log("Setter " + theColor);
    }
  });
}

var aCar = new Car();
aCar.color = "red";

console.log("aCar " + aCar.color);


// Object.preventExtensions(yourObject) prevents new properties to be added to yourObject.
// Use Object.isExtensible(<yourObject>) to check if the method was used on the object.
//The prevention is shallow (read below).

//Object.seal(yourObject) same as above and properties can not be removed
//(effectively sets configurable: false to all properties).
//Use Object.isSealed(<yourObject>) to detect this feature on the object.
//The seal is shallow (read below).

//Object.freeze(yourObject) same as above and properties can not be changed
//(effectively sets writable: false to all properties with data descriptor).
//Setter's writable property is not affected (since it doesn't have one).
//The freeze is shallow: it means that if the property is Object,
//its properties ARE NOT frozen (if you wish to, you should perform something like "deep freeze",
//similar to deep copy - cloning). Use Object.isFrozen(<yourObject>) to detect it.

var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
});
