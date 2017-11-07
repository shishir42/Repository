JavaScript’s Undefined Explored

It sounds a simple concept, but how do you actually check that a variable or property in JavaScript really exists? What is the best way to do this? How do we cover all of the edge cases? First, let’s look at what is undefined…

Overview of undefined

The value of a variable is given a type, and there are several built-in native types in JavaScript:

Undefined
Null
Boolean
String
Number
Object
Reference
etc…
Looking at 1, the built-in Undefined type can only ever have a single value, which is called undefined. This value is a primitive, and whenever a variable is declared it is assigned this undefined value, until you programmatically assign it a different value.

Also, whenever a function finishes executing and returns without a given value, it returns undefined by default.

var foo,
    bar = (function() {
        // do some stuff
    }()),
    baz = (function() {
        var hello;
        return hello;
    }());

typeof foo; // undefined
typeof bar; // undefined
typeof baz; // undefined

So when a variable is declared but not assigned a value, it is given a value of undefined. We should also note that undefined is a variable / property that is available in the global scope, that also has the value of undefined.

typeof undefined; // undefined

var foo;

foo === undefined; // true
However, the global variable undefined is not a reserved word and therefore can be redefined. Luckily as of ECMA 5, undefined is not permitted to be redefined, but in previous versions and older browsers it was possible to do the following:

typeof undefined; // undefined
undefined = 99;
typeof undefined; // number
What is this null business all about?

Take the following:

null == undefined // true
null !== undefined // true
Many people are confused by the above, the the explanation is quite simple. The only real relationship between null and undefined is that they both evaluate to false during type coercion.

So null == undefined // true is because the == is not performing a strict comparison, where as using the !== is more strict when comparing types. Whenever you see null as the value, it has always been programmatically assigned and never set by default.

Accessing properties on on object

When you try to use a property on an object that does not exist you will also get undefined, except for if you try to use the non existent property as a function will sometimes raise an error.

var foo = {};

foo.bar; // undefined
foo.bar(); // TypeError
What happens if you want to tell the difference between a property that has a value undefined and a property that does not exist at all? Both typeof and === will give you a value of undefined.

Using the in operator will check does a certain property exist in an object:

var foo = {};

// undefined (Not good, bar has never been declared in the window object)
typeof foo.bar;

// false (Use this if you don't care about the prototype chain)
'bar' in foo;

// false (use this if you do care about the prototype chain)
foo.hasOwnProperty('bar');
Should you use typeof or in / hasOwnProperty?

It depends. Generally, if you want to test for the existence of a property then use in / hasOwnProperty and if you want to check for the value of a property / variable use typeof instead.

Let’s recap with some examples

Check if a variable exists:

if (typeof foo !== 'undefined') {}
Check if a property on an object exists, regardless if it has been assigned a value or not:

// exists on the object, checks the prototype too
if ('foo' in bar) {}

// exists directly on the object, don't check the prototype
if (bar.hasOwnProperty('foo')) {}
Check if a property on an object exists, and the property has a value set (truthy or falsy)

var bar = {
    foo: false
};

if ('foo' in bar && typeof bar.foo !== 'undefined'){
    // bar.foo exists, and it contains a value which was programatically assigned
}
