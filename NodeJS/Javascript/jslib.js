http://checkman.io/blog/creating-a-javascript-library/
https://code.tutsplus.com/tutorials/build-your-first-javascript-library--net-26796
https://www.sitepoint.com/design-and-build-your-own-javascript-library/
https://www.codementor.io/chimeremezeukah/build-a-reusable-javascript-library-du1086d7l
https://ourcodeworld.com/articles/read/37/how-to-create-your-own-javascript-library
http://www.mikedoesweb.com/2012/creating-your-own-javascript-library/
https://www.lynda.com/JavaScript-tutorials/Creating-Open-Source-JavaScript-Library/604269-2.html
https://github.com/volojs/volo/wiki/Library-best-practices
http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
https://webstandardssherpa.com/reviews/secrets-of-awesome-javascript-api-design.html
https://code.tutsplus.com/articles/rolling-your-own-framework--cms-21810
https://s3.amazonaws.com/dailyjs/files/build-a-javascript-framework.pdf


Step 1: Creating the Library Boilerplate
We’ll start with some wrapper code, which will contain our whole library. It’s your typical immediately invoked function expression (IIFE).


window.dome = (function () {
    function Dome (els) {

    }

    var dome = {
        get: function (selector) {

        }
    };

    return dome;
}());

As you can see, we’re calling our library Dome, because it’s primarily a DOM library. Yes, it’s lame.

Step 2: Getting Elements

The dome.get function will take one parameter, but it could be a number of things. If it’s a string, we’ll assume it’s a CSS selector; but we can also take a single DOM Node, or a NodeList.

get: function (selector) {
    var els;
    if (typeof selector === "string") {
        els = document.querySelectorAll(selector);
    } else if (selector.length) {
        els = selector;
    } else {
        els = [selector];
    }
    return new Dome(els);
}


Step 3: Creating Dome Instances

function Dome (els) {
    for(var i = 0; i < els.length; i++ ) {
        this[i] = els[i];
    }
    this.length = els.length;
}

Step 4: Adding a Few Utilities

Dome.prototype.map = function (callback) {
    var results = [], i = 0;
    for ( ; i < this.length; i++) {
        results.push(callback.call(this, this[i], i));
    }
    return results;
};

By doing it this way, the function will be called in the context of our Dome instance, and it will receive two parameters: the current element, and the index number.

We also want a forEach function. This is actually really simple:

Dome.prototype.forEach(callback) {
    this.map(callback);
    return this;
};

Since the only difference between map and forEach is that map needs to return something, we can just pass our callback to this.map and ignore the returned array; instead, we’ll return this to make our library chainable. We’ll be using forEach quite a bit. So, notice that when we return our this.forEach call from a function, we’re actually returning this. For example, these methods actually return the same thing:


Dome.prototype.someMethod1 = function (callback) {
    this.forEach(callback);
    return this;
};

Dome.prototype.someMethod2 = function (callback) {
    return this.forEach(callback);
};

Step 5: Working with Text and HTML
Next, let’s add that text method. Just like jQuery, we can pass it a string and set the element’s text, or use no parameters to get the text back.

Dome.prototype.text = function (text) {
    if (typeof text !== "undefined") {
        return this.forEach(function (el) {
            el.innerText = text;
        });
    } else {
        return this.mapOne(function (el) {
            return el.innerText;
        });
    }
};

Dome.prototype.html = function (html) {
    if (typeof html !== "undefined") {
        this.forEach(function (el) {
            el.innerHTML = html;
        });
        return this;
    } else {
        return this.mapOne(function (el) {
            return el.innerHTML;
        });
    }
};


Step 6: Hacking Classes
Next up, we want to be able to add and remove classes; so let’s write the addClass and removeClass methods.

Our addClass method will take either a string or an array of class names. To make this work, we need to check the type of that parameter. If it’s an array, we’ll loop over it and create a string of class names. Otherwise, we’ll just add a single space to the front of the class name, so it doesn’t mess with the existing classes on the element. Then, we just loop over the elements and append the new classes to the className property.


Dome.prototype.addClass = function (classes) {
    var className = "";
    if (typeof classes !== "string") {
        for (var i = 0; i < classes.length; i++) {
            className += " " + classes[i];
        }
    } else {
        className = " " + classes;
    }
    return this.forEach(function (el) {
        el.className += className;
    });
};

Dome.prototype.removeClass = function (clazz) {
    return this.forEach(function (el) {
        var cs = el.className.split(" "), i;

        while ( (i = cs.indexOf(clazz)) > -1) {
            cs = cs.slice(0, i).concat(cs.slice(++i));
        }
        el.className = cs.join(" ");
    });
};

Step 8: Adjusting Attributes
Now, we want an attr function. This’ll be easy, because it’s practically identical to our text or html methods. Like those methods, we’ll be able to both get and set attributes: we’ll take an attribute name and value to set, and just an attribute name to get.


Dome.prototype.attr = function (attr, val) {
    if (typeof val !== "undefined") {
        return this.forEach(function(el) {
            el.setAttribute(attr, val);
        });
    } else {
        return this.mapOne(function (el) {
            return el.getAttribute(attr);
        });
    }
};


Step 9: Creating Elements

We should be able to create new elements, like any good library can. Of course, this would be no good as a method on a Dome instance, so let’s put it right on our dome object.

var dome = {
    // get method here
    create: function (tagName, attrs) {

    }
};

create: function (tagName, attrs) {
    var el = new Dome([document.createElement(tagName)]);
        if (attrs) {
            if (attrs.className) {
                el.addClass(attrs.className);
                delete attrs.className;
            }
        if (attrs.text) {
            el.text(attrs.text);
            delete attrs.text;
        }
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                el.attr(key, attrs[key]);
            }
        }
    }
    return el;
}

Step 11: Removing Nodes

Dome.prototype.remove = function () {
    return this.forEach(function (el) {
        return el.parentNode.removeChild(el);
    });
};


Step 12: Working with Events

Dome.prototype.on = (function () {
    if (document.addEventListener) {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.addEventListener(evt, fn, false);
            });
        };
    } else if (document.attachEvent)  {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.attachEvent("on" + evt, fn);
            });
        };
    } else {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el["on" + evt] = fn;
            });
        };
    }
}());

Dome.prototype.off = (function () {
    if (document.removeEventListener) {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.removeEventListener(evt, fn, false);
            });
        };
    } else if (document.detachEvent)  {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el.detachEvent("on" + evt, fn);
            });
        };
    } else {
        return function (evt, fn) {
            return this.forEach(function (el) {
                el["on" + evt] = null;
            });
        };
    }
}());
