//JavaScript Module Pattern: In-Depth

//Anonymous Closures
//This is the fundamental construct that makes it all possible, and really is the single best feature of //JavaScript. We’ll simply create an anonymous function, and execute it immediately. All of the code that runs //inside the function lives in a closure, which provides privacy and state throughout the lifetime of our //application.

(function () {
	// ... all vars and functions are in this scope only
	// still maintains access to all globals
}());

//Notice the () around the anonymous function. This is required by the language, since statements that begin with //the token function are always considered to be function declarations. Including () creates a function expression //instead.


//Global Import
// JavaScript has a feature known as implied globals. Whenever a name is used, the interpreter walks the scope //chain backwards looking for a var statement for that name. If none is found, that variable is assumed to be //global. If it’s used in an assignment, the global is created if it doesn’t already exist. This means that using //or creating global variables in an anonymous closure is easy. Unfortunately, this leads to hard-to-manage code, //as it’s not obvious (to humans) which variables are global in a given file.
//
// Luckily, our anonymous function provides an easy alternative. By passing globals as parameters to our anonymous //function, we import them into our code, which is both clearer and faster than implied globals. Here’s an example:

(function ($, YAHOO) {
	// now have access to globals jQuery (as $) and YAHOO in this code
}(jQuery, YAHOO));


//Module Export
//Sometimes you don’t just want to use globals, but you want to declare them. We can easily do this by exporting //them, using the anonymous function’s return value. Doing so will complete the basic module pattern, so here’s a //complete example:

var MODULE = (function () {
	var my = {},
		privateVariable = 1;

	function privateMethod() {
		// ...
	}

	my.moduleProperty = 1;
	my.moduleMethod = function () {
		// ...
	};

	return my;
}());

//Notice that we’ve declared a global module named MODULE, with two public properties: a method named //MODULE.moduleMethod and a variable named MODULE.moduleProperty. In addition, it maintains private internal state //using the closure of the anonymous function. Also, we can easily import needed globals, using the pattern we //learned above.


//Augmentation
//One limitation of the module pattern so far is that the entire module must be in one file. Anyone who has worked //in a large code-base understands the value of splitting among multiple files. Luckily, we have a nice solution //to augment modules. First, we import the module, then we add properties, then we export it. Here’s an example, //augmenting our MODULE from above:

var MODULE = (function (my) {
	my.anotherMethod = function () {
		// added method...
	};

	return my;
}(MODULE));

//We use the var keyword again for consistency, even though it’s not necessary. After this code has run, our //module will have gained a new public method named MODULE.anotherMethod. This augmentation file will also //maintain its own private internal state and imports.


//Loose Augmentation
//While our example above requires our initial module creation to be first, and the augmentation to happen second, //that isn’t always necessary. One of the best things a JavaScript application can do for performance is to load //scripts asynchronously. We can create flexible multi-part modules that can load themselves in any order with //loose augmentation. Each file should have the following structure:

var MODULE = (function (my) {
	// add capabilities...

	return my;
}(MODULE || {}));

//In this pattern, the var statement is always necessary. Note that the import will create the module if it does //not already exist. This means you can use a tool like LABjs and load all of your module files in parallel, //without needing to block.


//Tight Augmentation
//While loose augmentation is great, it does place some limitations on your module. Most importantly, you cannot //override module properties safely. You also cannot use module properties from other files during initialization //(but you can at run-time after intialization). Tight augmentation implies a set loading order, but allows //overrides. Here is a simple example (augmenting our original MODULE):

var MODULE = (function (my) {
	var old_moduleMethod = my.moduleMethod;

	my.moduleMethod = function () {
		// method override, has access to old through old_moduleMethod...
	};

	return my;
}(MODULE));

//Here we’ve overridden MODULE.moduleMethod, but maintain a reference to the original method, if needed.

//Tight Augmentation
//While loose augmentation is great, it does place some limitations on your module. Most importantly, you cannot //override module properties safely. You also cannot use module properties from other files during initialization //(but you can at run-time after intialization). Tight augmentation implies a set loading order, but allows //overrides. Here is a simple example (augmenting our original MODULE):

var MODULE = (function (my) {
	var old_moduleMethod = my.moduleMethod;

	my.moduleMethod = function () {
		// method override, has access to old through old_moduleMethod...
	};

	return my;
}(MODULE));

//Here we’ve overridden MODULE.moduleMethod, but maintain a reference to the original method, if needed.


//Cloning and Inheritance
var MODULE_TWO = (function (old) {
	var my = {},
		key;

	for (key in old) {
		if (old.hasOwnProperty(key)) {
			my[key] = old[key];
		}
	}

	var super_moduleMethod = old.moduleMethod;
	my.moduleMethod = function () {
		// override method on the clone, access to super through super_moduleMethod
	};

	return my;
}(MODULE));

//This pattern is perhaps the least flexible option. It does allow some neat compositions, but that comes at the //expense of flexibility. As I’ve written it, properties which are objects or functions will not be duplicated, //they will exist as one object with two references. Changing one will change the other. This could be fixed for //objects with a recursive cloning process, but probably cannot be fixed for functions, except perhaps with eval. //Nevertheless, I’ve included it for completeness.


//Cross-File Private State
//One severe limitation of splitting a module across multiple files is that each file maintains its own private //state, and does not get access to the private state of the other files. This can be fixed. Here is an example //of a loosely augmented module that will maintain private state across all augmentations:

var MODULE = (function (my) {
	var _private = my._private = my._private || {},
		_seal = my._seal = my._seal || function () {
			delete my._private;
			delete my._seal;
			delete my._unseal;
		},
		_unseal = my._unseal = my._unseal || function () {
			my._private = _private;
			my._seal = _seal;
			my._unseal = _unseal;
		};

	// permanent access to _private, _seal, and _unseal

	return my;
}(MODULE || {}));

//Any file can set properties on their local variable _private, and it will be immediately available to the //others. Once this module has loaded completely, the application should call MODULE._seal(), which will prevent //external access to the internal _private. If this module were to be augmented again, further in the //application’s lifetime, one of the internal methods, in any file, can call _unseal() before loading the new //file, and call _seal() again after it has been executed. This pattern occurred to me today while I was at work, //I have not seen this elsewhere. I think this is a very useful pattern, and would have been worth writing about //all on its own.


//Sub-modules
//Our final advanced pattern is actually the simplest. There are many good cases for creating sub-modules. It is //just like creating regular modules:

MODULE.sub = (function () {
	var my = {};
	// ...

	return my;
}());

//While this may have been obvious, I thought it worth including. Sub-modules have all the advanced capabilities //of normal modules, including augmentation and private state.


//Creating a Module

(function () {
  // code
})();


//It declares a function, which then calls itself immediately. These are also known as //Immediately-Invoked-Function-Expressions, in which the function creates new scope and creates “privacy”. //JavaScript doesn’t have privacy, but creating new scope emulates this when we wrap all our function logic //inside them. The idea then is to return only the parts we need, leaving the other code out of the global scope.

//After creating new scope, we need to namespace our code so that we can access any methods we return. Let’s //create a namespace for our anonymous Module.


var Module = (function () {
  // code
})();

//We then have Module declared in the global scope, which means we can call it wherever we like, and even pass it //into another Module.

//Private methods

var Module = (function () {

  var privateMethod = function () {
    // do something
  };

})();

//The above example declares our function privateMethod, which is locally declared inside the new scope. If we //were to attempt calling it anywhere outside of our module, we’ll get an error thrown and our JavaScript program //will break! We don’t want anyone to be able to call our methods, especially ones that might manipulate data and //go back and forth to a server.


//Understanding “return”
//Typical Modules will use return and return an Object to the Module, to which the methods bound to the Object //will be accessible from the Module’s namespace.

//A real light example of returning an Object with a function as a property:

var Module = (function () {

  return {
    publicMethod: function () {
      // code
    }
  };

})();

//As we’re returning an Object Literal, we can call them exactly like Object Literals:
Module.publicMethod();


//For those who haven’t used the Object Literal syntax before, a standard Object Literal could look something //like this:

var myObjLiteral = {
  defaults: { name: 'Todd' },
  someMethod: function () {
    console.log(this.defaults);
  }
};

// console.log: Object { name: 'Todd' }
myObjLiteral.someMethod();


//But the issue with Object Literals is the pattern can be abused. Methods intended to be “private” will be //accessible by users because they are part of the Object. This is where the Module comes in to save us, by //allowing us to define all our “private” stuff locally and only return “the good parts”.

//Let’s look at a more Object Literal syntax, and a perfectly good Module Pattern and the return keyword’s role. //Usually a Module will return an Object, but how that Object is defined and constructed is totally up to you. //Depending on the project and the role/setup of the code, I may use one of a few syntaxes.

//Anonymous Object Literal return

var Module = (function () {

  var privateMethod = function () {};

  return {
    publicMethodOne: function () {
      // I can call `privateMethod()` you know...
    },
    publicMethodTwo: function () {

    },
    publicMethodThree: function () {

    }
  };

})();

//Locally scoped Object Literal

//Local scope means a variable/function declared inside a scope. On the Conditionizr project, we use a locally //scoped namespace as the file is over 100 lines, so it’s good to be able to see what are the public and private //methods without checking the return statement. In this sense, it’s much easier to see what is public, because //they’ll have a locally scoped namespace attached:

var Module = (function () {

  // locally scoped Object
  var myObject = {};

  // declared with `var`, must be "private"
  var privateMethod = function () {};

  myObject.someMethod = function () {
    // take it away Mr. Public Method
  };

  return myObject;

})();

//You’ll then see on the last line inside the Module that myObject is returned. Our global Module doesn’t care //that the locally scoped Object has a name, we’ll only get the actual Object sent back, not the name. It offers //for better code management.


//Stacked locally scoped Object Literal
//This is pretty much identical as the previous example, but uses the “traditional” single Object Literal //notation:

var Module = (function () {

  var privateMethod = function () {};

  var myObject = {
    someMethod:  function () {

    },
    anotherMethod:  function () {

    }
  };

  return myObject;

})();

//I prefer the second approach we looked at, the Locally scoped Object Literal. Because here, we have to declare //other functions before we use them (you should do this, using function myFunction () {} hoists your functions //and can cause issues when used incorrectly). Using var myFunction = function () {}; syntax lets us not worry //about this, as we’ll declare them all before we use them, this also makes debugging easier as the JavaScript //interpreter will render our code in the order we declare, rather than hoisting function declarations. I also //don’t like this approach so much, because the “stacking” method can often get verbose looking, and there is no //obvious locally scoped Object namespace for me to bolt public methods onto.


//Revealing Module Pattern

//We’ve looked at the Module, and there’s a really neat variant which is deemed the “revealing” pattern, in which //we reveal public pointers to methods inside the Module’s scope. This again, can create a really nice code //management system in which you can clearly see and define which methods are shipped back to the Module:

var Module = (function () {

  var privateMethod = function () {
    // private
  };

  var someMethod = function () {
    // public
  };

  var anotherMethod = function () {
    // public
  };

  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod
  };

})();

//Accessing “Private” Methods

//You might be thinking at some stage during this article, “So if I make some methods private, how can I call //them?”. This is where JavaScript becomes even more awesome, and allows us to actually invoke private functions //via our public methods. Observe:

var Module = (function () {

  var privateMethod = function (message) {
    console.log(message);
  };

  var publicMethod = function (text) {
    privateMethod(text);
  };

  return {
    publicMethod: publicMethod
  };

})();

// Example of passing data into a private method
// the private method will then `console.log()` 'Hello!'
Module.publicMethod('Hello!');

//You’re not just limited to methods, though. You’ve access to Objects, Arrays, anything:

var Module = (function () {

  var privateArray = [];

  var publicMethod = function (somethingOfInterest) {
    privateArray.push(somethingOfInterest);
  };

  return {
    publicMethod: publicMethod
  };

})();

//Augmenting Modules

//So far we’ve created a nice Module, and returned an Object. But what if we wanted to extend our Module, and //include another smaller Module, which extends our original Module?

//Let’s assume the following code:
var Module = (function () {

  var privateMethod = function () {
    // private
  };

  var someMethod = function () {
    // public
  };

  var anotherMethod = function () {
    // public
  };

  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod
  };

})();


//Private Naming Conventions
//I personally love the Revealing Module Pattern, and as such, I have many functions dotting around my code that //visually are all declared the same, and look the same when I’m scanning around. I sometimes create a locally //scoped Object, but sometimes don’t. When I don’t, how can I distinguish between private variables/methods? The //_ character! You’ve probably seen this dotted around the web, and now you know why we do it:


var Module = (function () {

  var _privateMethod = function () {
    // private stuff
  };

  var publicMethod = function () {
    _privateMethod();
  };

  return {
    publicMethod: publicMethod
  };

})();


// what are modules ?
// In JavaScript, the word “modules” refers to small units of independent, reusable code. They are the foundation of many JavaScript design patterns and are critically necessary when building any non-trivial JavaScript-based application.
//
// The closest analog in the Java language are Java Classes. However, JavaScript modules export a value, rather than define a type. In practice, most JavaScript modules export an object literal, a function, or a constructor. Modules that export a string containing an HTML template or a CSS stylesheet are also common.
//
// ECMAScript, the JavaScript standards body, expects to ratify a final specification for modules in ECMAScript version 6 by the end of 2014. ECMAScript 6 modules (“ES6 modules”), however, will likely not be feasible to use in production until 2016 due to the long upgrade cycles of some browsers and operating systems.
//
// Why use modules?
// There are a lot of benefits to using modules in favour of a sprawling, interdependent codebase. The most important ones, in my opinion, are:
//
// 1) Maintainability: By definition, a module is self-contained. A well-designed module aims to lessen the dependencies on parts of the codebase as much as possible, so that it can grow and improve independently. Updating a single module is much easier when the module is decoupled from other pieces of code.
//
// Going back to our book example, if you wanted to update a chapter in your book, it would be a nightmare if a small change to one chapter required you to tweak every other chapter as well. Instead, you’d want to write each chapter in such a way that improvements could be made without affecting other chapters.
//
// 2) Namespacing: In JavaScript, variables outside the scope of a top-level function are global (meaning, everyone can access them). Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.
//
// Sharing global variables between unrelated code is a big no-no in development.
//
// As we’ll see later in this post, modules allow us to avoid namespace pollution by creating a private space for our variables.
//
// 3) Reusability: Let’s be honest here: we’ve all copied code we previously wrote into new projects at one point or another. For example, let’s imagine you copied some utility methods you wrote from a previous project to your current project.
//
// That’s all well and good, but if you find a better way to write some part of that code you’d have to go back and remember to update it everywhere else you wrote it.


(function () {
  // We keep these variables private inside this closure scope

  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item;
    }, 0);

      return 'Your average grade is ' + total / myGrades.length + '.';
  };

  var failing = function(){
    var failingGrades = myGrades.filter(function(item) {
      return item < 70;});

    return 'You failed ' + failingGrades.length + ' times.';
  };

  console.log(failing());

}());
//// ‘You failed 2 times.’

// With this construct, our anonymous function has its own evaluation environment or “closure”, and then we immediately evaluate it. This lets us hide variables from the parent (global) namespace.
//
// What’s nice about this approach is that is that you can use local variables inside this function without accidentally overwriting existing global variables, yet still access the global variables, like so:

var global = 'Hello, I am a global variable :)';

(function () {
  // We keep these variables private inside this closure scope

  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item;}, 0);

    return 'Your average grade is ' + total / myGrades.length + '.';
  };

  var failing = function(){
    var failingGrades = myGrades.filter(function(item) {
      return item < 70;});

    return 'You failed ' + failingGrades.length + ' times.';
  };

  console.log(failing());
  console.log(global);
}());

// 'You failed 2 times.'
// 'Hello, I am a global variable :)'


// Example 2: Global import
// Another popular approach used by libraries like jQuery is global import. It’s similar to the anonymous closure we just saw, except now we pass in globals as parameters:


(function (globalVariable) {

  // Keep this variables private inside this closure scope
  var privateFunction = function() {
    console.log('Shhhh, this is private!');
  };

  // Expose the below methods via the globalVariable interface while
  // hiding the implementation of the method within the
  // function() block

  globalVariable.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  globalVariable.filter = function(collection, test) {
    var filtered = [];
    globalVariable.each(collection, function(item) {
      if (test(item)) {
        filtered.push(item);
      }
    });
    return filtered;
  };

  globalVariable.map = function(collection, iterator) {
    var mapped = [];
    globalUtils.each(collection, function(value, key, collection) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

  globalVariable.reduce = function(collection, iterator, accumulator) {
    var startingValueMissing = accumulator === undefined;

    globalVariable.each(collection, function(item) {
      if(startingValueMissing) {
        accumulator = item;
        startingValueMissing = false;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;

  };

 }(globalVariable));

// In this example, globalVariable is the only variable that’s global. The benefit of this approach over anonymous closures is that you declare the global variables upfront, making it crystal clear to people reading your code.


// Example 3: Object interface
// Yet another approach is to create modules using a self-contained object interface, like so:

var myGradesCalculate = (function () {

  // Keep this variable private inside this closure scope
  var myGrades = [93, 95, 88, 0, 55, 91];

  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    average: function() {
      var total = myGrades.reduce(function(accumulator, item) {
        return accumulator + item;
        }, 0);

      return'Your average grade is ' + total / myGrades.length + '.';
    },

    failing: function() {
      var failingGrades = myGrades.filter(function(item) {
          return item < 70;
        });

      return 'You failed ' + failingGrades.length + ' times.';
    }
  };
})();

myGradesCalculate.failing(); // 'You failed 2 times.'
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'

// As you can see, this approach lets us decide what variables/methods we want to keep private (e.g. myGrades) and what variables/methods we want to expose by putting them in the return statement (e.g. average & failing).


//Example 4: Revealing module pattern
//This is very similar to the above approach, except that it ensures all methods and variables are kept private until explicitly exposed:

var myGradesCalculate = (function () {

  // Keep this variable private inside this closure scope
  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item;
      }, 0);

    return'Your average grade is ' + total / myGrades.length + '.';
  };

  var failing = function() {
    var failingGrades = myGrades.filter(function(item) {
        return item < 70;
      });

    return 'You failed ' + failingGrades.length + ' times.';
  };

  // Explicitly reveal public pointers to the private functions
  // that we want to reveal publicly

  return {
    average: average,
    failing: failing
  };
})();

myGradesCalculate.failing(); // 'You failed 2 times.'
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'

// Module Pattern is very common in the JavaScript world with its great importance. It helps us to write clean object oriented JavaScript. Module Pattern restricts the developer to create multiple Global Variables. It is always a good practice to have less number of global variables for good performance of web application. Hence this pattern increases the performance of your website, at the same time it gives the well maintainable object oriented programing practice.

// What is Module Pattern
// In JavaScript programing language, functions can be used as a Module. Sometimes, it is required to create a singleton object instead of creating instance of a class. Inside the module, the inner functions do have the static scope with the other defined variables and functions.
//
// Maximum applications written in JavaScript languages are singletons only. Hence, they all are written in Module pattern.
//
// A Module can be considered as a Singleton Class in C#. In a Module, all the variables defined are visible only in the module. Methods in a module have scope and access to the shared private data and private methods. Hence, these methods are also called as Privileged methods.
//
// Therefore, by creating one anonymous function returns a set of privileged methods in a simple object literal format. And because of the closure principle, those privileged methods have access to the inner methods and variables of the anonymous function. We call it as a Module Pattern.
//
// Privileged Method
// In Module Pattern, you can write your private methods, private variables those you don’t want to expose to the other world and at the same time you will be able to write public and privileged methods also. The great usefulness of this pattern is that you can very well access your private methods and variables from your methods those are called as Privileged Methods.
//
// Closure
// In order to learn Module Pattern, one must be aware of Closure principle. By using closure only modular pattern becomes very useful and powerful. Closure principle says that any inner function inside a parent function has scope to the other inner function and variables although after the parent function has returned. In Module Pattern, Privileged methods have scope to the other private variables and methods of the module.
//
// Self-executed Function
// In Module Pattern, we create one Global Singleton Object by writing self-executed method. Self-executed method is an anonymous method that is being called by itself only. See the below code that explains how we can write self-executed method.
//
// Example of Self-executed function

(function ( ) {
    //create variable
    //var name = "rupesh";
    //create method
    //var sayName = function ( ) {
    //    alert(name);
    //};
})( );//calling this method.

// In the above code, I have one anonymous method that is declared and just after declaration it has been called by writing(); The moment we execute this JavaScript code, this method will get executed by itself only. Hence it is called a self-executed method.
//
// Sample of Module Pattern
// Having understood the idea of module pattern, self-executed method, closure now let me define the module pattern style. See the below code:


//Single Global Variable "Module"
var Module = ( function ( ) {
    var privateVariable = "some value",
        privateMethod = function ( ) {
			//do something.
	};
    //returning one anonymous object literal that would expose privileged methods.
    return {
         //the method inside the return object are
         //called as privileged method because it has access
         //to the private methods and variables of the module.

         privilegedMethod : function ( ) {
            //this method can access its private variable and method
            //by using the principle of closure.
            alert(privateVariable); //accessing private variable.
            privateMethod( ); //calling private method
        }
    };
})( );

// Here Module is the Single Global Variable that is exposed to the document. We are declaring, calling one anonymous method and assigning it to Module variable. Now we can call privilegedMethod by writing Module.privilegedMethod(); internally privileged Method of module can access its private variable and private method. Because, they come under their static scope. If we have any data or method that we don't want to expose, we can put them in private methods.
//
// We can also write the above code in a different manner, see the below way:

//Single Global Variable "Module"
var Module = ( function ( ) {
    var
     privateVariable = "some value",
     privateMethod = function ( ) {
        //do something.
    },
    //object literal that would have privileged methods.
    retObject = {
         //the method inside the return object are
         //called as privileged method because it has access
         //to the private methods and variables of the module.
         privilegedMethod : function ( ) {
            //this method can access its private variable and method
            //by using the principle of closure.
            alert(privateVariable); //accessing private variable.
            privateMethod( ); //calling private method
        }
    };
    //returning the object.
    return retObject;
})( );

// Public Methods don't have access to Private Methods and variables, only the privileged method inside the Module can have access because of the closure. Let's see it.
//
// We can create the public methods in the Module by the below method:


//augmenting public method in the module
Module.publicMethod1 = function () {
    //do something...
    //However here we will not have access to the private methods of the Module.
    //We can call the privileged method of the module object from here.
    //And by the privileged method we can call or access the inner private
    // methods and variables correspondingly
    Module.privateMethod ( ); // this is not possible.
    //calling a privileged method of module
    Module.privilegedMethod ( ); // this can be possible.
};

// In the above example, the public method publicMethod1 that we augmented into the module doesn't have access to the privateMethod of the Module object. In order to access the private Methods or Variables, we can call the privileged method of the Module inside the public. This is the benefit of this pattern. In our above example, we could call Module.privilegedMethod().

//Example of Module Pattern
// I have created one sample .NET application, the same is attached here in this article. In that .NET Application, I have created one Module pattern JavaScript function. Let's discuss the same function. See the below code snippet:

//One Global object exposed.
var SearchEngine = (function ( ) {
    //Private Method.
    var luckyAlgo = function ( ){
        //create one random number.
        return Math.floor(Math.random()*11);
    };
    //Returning the object
    return {
        //privileged method.
        getYourLuckyNumber : function ( ){
            //Has access to its private method because of closure.
            return luckyAlgo();
        }
    };
} ) ( );//Self executing method.

// In the above code snippet, I have one Global variable called SearchEngine. A self-executed anonymous method is assigned in to the SearchEngine variable.
//
// SearchEngine has one Private method luckyAlgo and one Privileged Method getYourLuckyNumber. The Privileged method is being returned by encapsulating in an anonymous object. SearchEngine can be accessed globally that will have one Privileged method only. And the Privileged method can call its local method luckyAlgo, because of the principle of Closure. In the above example, if you call getYourLuckyNumber method then it will return one random number.

// Creating Sub Modules
// We can create the sub-module as well by augmenting our module object with a sub module. It will be again in the same module pattern fashion. See the below example, I have created one more subSearch object inside the SearchEngine object by following the same module pattern.

//Augmenting the module with submodule
SearchEngine.subSearch = (function ( ) {
   //Private variable.
   var defaultColor = "Orange";
    //private method.
    var myColorAlgo = function (num) {
        switch(num){
            case 1:
            defaultColor ="Green";break;
            case 2:
            defaultColor ="Black";break;
            case 3:
            defaultColor ="Yellow";break;
            case 4:
            defaultColor ="White";break;
            case 9:
            defaultColor ="Red";break;
        }
    };
    return {
    //privileged method
        getYourLuckyColor : function(){
            //access to private variable because of closure.
            myColorAlgo(SearchEngine.getYourLuckyNumber());
            return defaultColor;
        }
    };
})();

// In the above example, if we call the getYourLuckyColor method, then it will give you one color name based on the random number. I know these methods are not much practical however, I could think of them only in order to explain the concept.

//Extending Modules
// We can extend the existing modules by wrapping it inside one new module. By doing that, we can very well access / override the existing method of the old module. See the below code:


var Module1 = ( function (oldModule) {
    var
	//assigning oldmodule in to a local variable.
	parent = oldModule;

    //overriding the existing privileged method.
    parent.privilegedMethod = function ( ){
         //do something different by overriding the old method.
    };

    //private method accessing privileged method of parent module.
    var privateMethod2 = function ( ) {
        parent.privilegedMethod();//can access privileged method of Module
        parent.publicMethod1(); //can access public method of Module
    };
    return {
        newMethod : function ( ) {
          ///do something for this brand new module.
          ///use some functionality of parent module.
          /// parent.privilegedMethod( );
        }
    };
} )(Module);//Module object is the existing module that I want to extend.


// In the above example, I have described the advanced features of Module pattern where one can re-use the existing module by extending, augmenting and overriding.
//
// I have passed the old existing Module object (see above in module pattern section, we have created one Module object) while calling our anonymous method and then I have assigned it into a local variable called as parent. Now, I can access the public/privileged methods of the parent Module in my private, privileged and public method of new Module1 object.
//
// The sweetness of this pattern comes when I can also override the existing method of the old Module. And you can see, I have overridden the privilegedMethod of the Module object. Similarly, I could have overridden the public method of the Module object


// What is a Closure?
// Closures are a construct of the JavaScript language. Within JavaScript all variables are accessible from the global scope except variables that are declared within a function using the var keyword.

variable1 = 1; // Global Scope
var variable2 = 2; // Not within a function: Global Scope
function funcName() {
    variable3 = 3; // No var keyword: Global Scope
    var variable4 = 4; // Local Scope only
}

// Within a function, you also have access to the global scope and every other scope above the function that you are in. In other words an inner function has access to the variables that are within the function that wraps it.

var globalvar = 1; // Global Scope
function outer() {
    var outervar = 2; // Scope is within outer()
    function inner() {
        var innervar = 3; // Scope is within inner()
        console.log(globalvar); // => 1
        console.log(outervar); // => 2
        console.log(innervar); // => 3
    }
    console.log(globalvar); // => 1
    console.log(outervar); // => 2
    console.log(innervar); // => Reference Error;
}
console.log(globalvar); // => 1
console.log(outervar); // => Reference Error
console.log(innervar); // => Reference Error


// Every real JavaScript programmer should know this if he or she wants to become great. Knowing this, you can come to the conclusion that there is a way to keep all of your code outside of the global namespace and you would be correct. This is especially helpful when you don’t want to give anyone a chance to override any of your code without your permission. You can accomplish this by using an anonymous function (no name is given to it and it is not assigned to a variable) that immediately executes itself. This is commonly known as a Self-Invoking Anonymous Function (SIAF), though it is probably more accurately referred to as an Immediately Invoked Function Expression (IIFE – pronounced “iffy”) by Ben Alman.

(function() {
    // This function immediately runs and all variables within here are private
}());


// Using Closures for the Module Pattern
// Knowing what we know about closures, we can create objects using the module pattern. By returning an object or variable and assigning it to a variable outside of the function, we can expose whatever we wish to the outside world, so we can have both public and private methods.

var Module = (function() {
    // Following function is private, but can be accessed by the public functions
    function privateFunc() {

    }
    // Return an object that is assigned to Module
    return {
        publicFunc: function() {
            privateFunc(); // publicFunc has direct access to privateFunc
        }
    };
}());

// That’s essentially the module pattern right there. You can also use the arguments to send in and shrink the name of commonly used assets:

var Module = (function($, w, undefined) {
    // ...
    // return {...};
}(jQuery, window));


// I sent in jQuery and window, which were abbreviated to $ and w, respectively. Notice that I didn’t send anything in for the third argument. This way undefined will be undefined, so it works perfectly. Some people do this with undefined because for whatever reason it is editable. So if you check to see if something is undefined, but undefined has been changed, your comparison will not work. This technique ensures that it will work as expected.
//
// The Revealing Module Pattern
// The revealing module pattern is another way to write the module pattern that takes a bit more code, but is easier to understand and read sometimes. Instead of defining all of the private methods inside the IIFE and the public methods within the returned object, you write all methods within the IIFE and just “reveal” which ones you wish to make public within the return statement.

var Module = (function() {
    // All functions now have direct access to each other
    var privateFunc = function() {
        publicFunc1();
    };
    var publicFunc1 = function() {
        publicFunc2();
    };
    var publicFunc2 = function() {
        privateFunc();
    };
    // Return the object that is assigned to Module
    return {
        publicFunc1: publicFunc1,
        publicFunc2: publicFunc2
    };
}());

// There are a few advantages to the revealing module pattern versus the normal module pattern:
//
// All the functions are declared and implemented in the same place, thus creating less confusion.
// Private functions now have access to public functions if they need to.
// When a public function needs to call another public function they can call publicFunc2() rather than this.publicFunc2(), which saves a few characters and saves your butt if this ends up being something different than originally intended.
// The only real downside to the revealing module pattern, as I said, is that you have to write a bit more code because you have to write the function and then write its name again in the return statement, though it could end up saving you code because you can skip the this. part.
//
// Module Pattern for Extension
// The last thing I wanted to talk about was using the module pattern for extending already-existing modules. This is done quite often when making plugins to libraries like jQuery, as you can see below.

(function($) {
    $.pluginFunc = function() {
        //...
    };
}(jQuery));

// This code is pretty flexible because you don’t even need the var jQuery = or the return statement near the end. jQuery will still be extended with the new method without them. It’s actually probably bad for performance to return the entire jQuery object and assign it, however, if you want to assign jQuery to a new variable name at the same time that you’re extending it, you can just change jQuery on the first line to whatever you want.
