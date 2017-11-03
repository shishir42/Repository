function(window){
    //I recommend this
    'use strict';
    function define_library(){
        var Library = {};
        var name = "Timmy";
        Library.greet = function(){
            alert("Hello from the " + name + " library.");
        }
        return Library;
    }
    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window.Library = define_Library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);


//Static Namespacing

//1. By Direct Assignment
//The most basic approach. Its verbose and if you ever wanted to rename the namespace you’ve got a job on your hands. However its safe and unambiguous.

var myApp = {}

myApp.id = 0;

myApp.next = function() {
    return myApp.id++;
}

myApp.reset = function() {
    myApp.id = 0;
}

window.console && console.log(
    myApp.next(),
    myApp.next(),
    myApp.reset(),
    myApp.next()
); //0, 1, undefined, 0


//2. Using Object Literal Notation

var myApp = {

    id: 0,

    next: function() {
        return this.id++;
    },

    reset: function() {
        this.id = 0;
    }
}
window.console && console.log(
    myApp.next(),
    myApp.next(),
    myApp.reset(),
    myApp.next()
) //0, 1, undefined, 0


//3. The Module Pattern

//I find myself using the module pattern more often these days. The logic is shielded from the global scope by //a function wrapper (usually self-invoking) which returns an object representing the module’s public //interface. By immediately invoking the function and assigning the result to a namespace variable, we lock up //the module’s API in the namespace. Additionally any variables not included in the return value will remain //forever private, visible only to the public functions that reference them.


var myApp = (function() {

    var id= 0;

    return {
        next: function() {
            return id++;
        },

        reset: function() {
            id = 0;
        }
    };
})();

window.console && console.log(
    myApp.next(),
    myApp.next(),
    myApp.reset(),
    myApp.next()
) //0, 1, undefined, 0


//Dynamic Namespacing

//4. Supply a Namespace Argument

var myApp = {};
(function(context) {
    var id = 0;

    context.next = function() {
        return id++;
    };

    context.reset = function() {
        id = 0;
    }
})(this);

window.console && console.log(
    next(),
    next(),
    reset(),
    next()
) //0, 1, undefined, 0

//5. Use this as a Namespace Proxy

var myApp = {};
(function() {
    var id = 0;

    this.next = function() {
        return id++;
    };

    this.reset = function() {
        id = 0;
    }
}).apply(myApp);

window.console && console.log(
    myApp.next(),
    myApp.next(),
    myApp.reset(),
    myApp.next()
); //0, 1, undefined, 0


(function( skillet, $, undefined ) {
    //Private Property
    var isHot = true;

    //Public Property
    skillet.ingredient = "Bacon Strips";

    //Public Method
    skillet.fry = function() {
        var oliveOil;

        addItem( "\t\n Butter \n\t" );
        addItem( oliveOil );
        console.log( "Frying " + skillet.ingredient );
    };

    //Private Method
    function addItem( item ) {
        if ( item !== undefined ) {
            console.log( "Adding " + $.trim(item) );
        }
    }
}( window.skillet = window.skillet || {}, jQuery ));

//The Module pattern was originally defined as a way to provide both private and public encapsulation for classes in conventional software engineering.


//When working with the Module pattern, we may find it useful to define a simple template that we use for getting started with it. Here's one that covers name-spacing, public and private variables.

//In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we //are able to include both public/private methods and variables inside a single object, thus shielding //particular parts from the global scope. What this results in is a reduction in the likelihood of our //function names conflicting with other functions defined in additional scripts on the page.


var myNamespace = (function () {

  var myPrivateVar, myPrivateMethod;

  // A private counter variable
  myPrivateVar = 0;

  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
      console.log( foo );
  };

  return {

    // A public variable
    myPublicVar: "foo",

    // A public function utilizing privates
    myPublicFunction: function( bar ) {

      // Increment our private counter
      myPrivateVar++;

      // Call our private method using bar
      myPrivateMethod( bar );

    }
  };

})();


//Advantages

//why is the Module pattern a good choice? For starters, it a lot cleaner for developers coming from an object-oriented background than the idea of true encapsulation, at least from a JavaScript perspective.

//Secondly, it supports private data - so, in the Module pattern, public parts of our code are able to touch the private parts, however the outside world is unable to touch the class private parts.

//Disadvantages

//The disadvantages of the Module pattern are that as we access both public and private members differently, when we wish to change visibility, we actually have to make changes to each place the member was used.


//The Revealing Module Pattern

// /Now that were a little more familiar with the module pattern, let’s take a look at a slightly improved version - Christian Heilmann’s Revealing Module pattern.

//The Revealing Module pattern came about as Heilmann was frustrated with the fact that he had to repeat the name of the main object when we wanted to call one public method from another or access public variables.He also disliked the Module pattern’s requirement for having to switch to object literal notation for the things he wished to make public.

//The result of his efforts was an updated pattern where we would simply define all of our functions and variables in the private scope and return an anonymous object with pointers to the private functionality we wished to reveal as public.

var myRevealingModule = (function () {

        var privateVar = "Ben Cherry",
            publicVar = "Hey there!";

        function privateFunction() {
            console.log( "Name:" + privateVar );
        }

        function publicSetName( strName ) {
            privateVar = strName;
        }

        function publicGetName() {
            privateFunction();
        }


        // Reveal public pointers to
        // private functions and properties

        return {
            setName: publicSetName,
            greeting: publicVar,
            getName: publicGetName
        };

    })();

myRevealingModule.setName( "Paul Kinlan" );

//Advantages

//This pattern allows the syntax of our scripts to be more consistent. It also makes it more clear at the end of the module which of our functions and variables may be accessed publicly which eases readability.

//Disadvantages

//A disadvantage of this pattern is that if a private function refers to a public function, that public function can't be overridden if a patch is necessary. This is because the private function will continue to refer to the private implementation and the pattern doesn't apply to public members, only to functions.


// mynamespace is an object to use as a namespace
mynamespace = (function() {

  // Variables in the namespace
  var mynamespace = {
    foo: "Yes, this is foo."
  };

  // "Public" methods for the namespace
  mynamespace.fooTwo = function() {
    return twice(this.foo);
  };

  // "Private" methods in the namespace
  function twice(x) {
    return x + x;
  }


  // A class in the namespace
  mynamespace.CoolClass = (function() {
    // Contstructor
    var coolclass = function() {
      this.bar = "A bar.";
    };

    // Convenience  var for the prototype
    var prototype = coolclass.prototype;

    // "Public" methods - add to the prototype
    prototype.barThree = function() {
      return thrice(this.bar);
    };

    // "Private" methods - functions starting with "_" are private only by
    // convention.
    prototype._barNine = function() {
      return thrice(thrice(this.bar));
    };

    // Internal functions - these are captured in the closure, note that they
    // are not duplicated when you do `new CoolClass()`. They cannot access
    // `this`.
    function thrice(x) {
      return x + x + x;
    }

    return coolclass;
  })();

  // Instantiate the CoolClass (must be after CoolClass is defined)
  mynamespace.coolObject = new mynamespace.CoolClass();

  return mynamespace;
})();


// Outside of the anonymous function, can access the following:
console.log(mynamespace.foo);        // "Yes, this is foo."
console.log(mynamespace.fooTwo());   // "Yes, this is foo.Yes, this is foo."

// The instantiated CoolClass object, and public members
console.log(mynamespace.coolObject);
console.log(mynamespace.coolObject.bar);        // "A bar."
console.log(mynamespace.coolObject.barThree()); // "A bar.A bar.A bar."

// Constructor for CoolClass
console.log(new mynamespace.CoolClass());
