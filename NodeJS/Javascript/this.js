JavaScript’s ‘this’ Keyword

A commonly used feature of JavaScript is the “this” keyword, but it is often also one of the most confused and misinterpreted features of the language. What does “this” actually mean and how is it decided?

This article tries to clear up the confusion and explain the answer in a clear fashion.

The “this” keyword is not new to those who have programmed in other languages, and more often than not it refers to the new object created when instantiating a class via it’s constructor. For example, if I have a class Boat(), which has a method moveBoat(), when refering to “this” inside of the moveBoat() method, we are actually accessing the newly created object of Boat().

In JavaScript, we also have this concept inside a Function constructor when it is invoked using the “new” keyword, however it is not the only rule and “this” can often refer to a different object from a different execution context. If you are not familiar with JavaScript’s execution context, I recommend you read my other post on the topic here. Enough talking, let’s see some JavaScript examples:

// global scope

foo = 'abc';
alert(foo); // abc

this.foo = 'def';
alert(foo); // def
Whenever you use the keyword “this” in the global context (not inside a function), it always refers to the global object. Now let’s look at the value of “this” inside a function:

var boat = {
    size: 'normal',
    boatInfo: function() {
        alert(this === boat);
        alert(this.size);
    }
};

boat.boatInfo(); // true, 'normal'

var bigBoat = {
    size: 'big'
};

bigBoat.boatInfo = boat.boatInfo;
bigBoat.boatInfo(); // false, 'big'
So how is “this” determined above? We can see an object boat which has a property size and a method boatInfo(). Inside boatInfo(), it alerts if the value of this is the actual boat object, and also alerts the size property of this. So, we invoke the function using boat.boatInfo() and can see that this is the boat object and the size property of the boat is normal.

We then create another object, bigBoat, which has a size property of big. However, the bigBoat object does not have a boatInfo() method, so we copy the method from boat using bigBoat.boatInfo = boat.boatInfo. Now, when we call bigBoat.boatInfo() and enter the function, we see that this is not equal to boat and that size property is now big. Why did this happen? How did the value of this change inside boatInfo()?

The first thing you must realise is that the value of this inside any function is never static, it is always determined every time you call a function, but before the function actually executes it’s code. The value of this inside a function is actually provided by the parent scope in which the function was called, and more importantly, how the actual function syntax was written.

Whenever a function is called, we must look at the immediate left side of the brackets / parentheses “()”. If on the left side of the parentheses we can see a reference, then the value of “this” passed to the function call is exactly of which that object belongs to, otherwise it is the global object. Let’s see some examples:

function bar() {
    alert(this);
}
bar(); // global - because the method bar() belongs to the global object when invoked

var foo = {
    baz: function() {
        alert(this);
    }
}
foo.baz(); // foo - because the method baz() belongs to the object foo when invoked
If things are clear this far, then the above code obviously makes sense. We can further complicate things by changing the value of “this” inside the very same function, by writing the call / invoke syntax in 2 different ways:

var foo = {
    baz: function() {
        alert(this);
    }
}
foo.baz(); // foo - because baz belongs to the foo object when invoked

var anotherBaz = foo.baz;
anotherBaz(); // global - because the method anotherBaz() belongs to the global object when invoked, NOT foo
Here, we see the value of “this” inside baz() was different each time, as it was syntactically called in 2 different ways. Now, let’s see the value of “this” inside a deeply nested object:

var anum = 0;

var foo = {
    anum: 10,
    baz: {
        anum: 20,
        bar: function() {
            console.log(this.anum);
        }
    }
}
foo.baz.bar(); // 20 - because left side of () is bar, which belongs to baz object when invoked

var hello = foo.baz.bar;
hello(); // 0 - because left side of () is hello, which belongs to global object when invoked
Another question often asked is how is the keyword “this” determined inside an event handler? The answer is “this” inside of an event handler always refers to the element it was triggered on. Let’s see an example:

<div id="test">I am an element with id #test</div>

function doAlert() {
    alert(this.innerHTML);
}

doAlert(); // undefined

var myElem = document.getElementById('test');
myElem.onclick = doAlert;

alert(myElem.onclick === doAlert); // true
myElem.onclick(); // I am an element
Here we can see that when doAlert() is first called, it alerts undefined, as doAlert() belongs to the global object. We then write myElem.onclick = doAlert, which copies the function doAlert() to the onclick() event of myElem. This basically means that whenever onclick() is fired, it is a method of myElem, meaning the value of “this” will be the myElem object exactly.

One last thing I want to note on this topic, is that the value of “this” can also be manually set using call() and apply(), overriding what we have discussed here today. Also of interested is that when calling “this” inside a function constructor, “this” refers to the newly created object in all instances inside the constructor. The reason for that is the function constructor is invoked with the “new” keyword, which creates a new object where “this” inside the constructor always refers to the new object just created.
