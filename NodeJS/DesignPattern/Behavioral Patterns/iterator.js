//Provide a way to access the elements of an aggregate object
//sequentially without exposing its underlying representation.


//The Iterator pattern allows clients to effectively loop over a collection of objects

//A common programming task is to traverse and manipulate a collection of objects.
//These collections may be stored as an array or perhaps something more complex,
//such as a tree or graph structure. In addition, you may need to access the items in the
//collection in a certain order, such as, front to back, back to front,
//depth first (as in tree searches), skip evenly numbered objects, etc.

//The Iterator design pattern solves this problem by separating the collection of
//objects from the traversal of these objects by implementing a specialized iterator.

//Today, many languages have Iterators built-in by supporting 'for-each'-type constructs
//and IEnumerable and IEnumerator interfaces. However, JavaScript only supports basic
//looping in the form of for, for-in, while, and do while statements.

//The Iterator pattern allows JavaScript developers to design looping constructs
//that are far more flexible and sophisticated.

var Iterator = function(items) {
    this.index = 0;
    this.items = items;
}

Iterator.prototype = {
    first: function() {
        this.reset();
        return this.next();
    },
    next: function() {
        return this.items[this.index++];
    },
    hasNext: function() {
        return this.index <= this.items.length;
    },
    reset: function() {
        this.index = 0;
    },
    each: function(callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}

// log helper

var log = (function() {
    var log = "";
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

function run() {
    var items = ["one", 2, "circle", true, "Applepie"];
    var iter = new Iterator(items);

    // using for loop

    for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
        log.add(item);
    }
    log.add("");

    // using Iterator's each method

    iter.each(function(item) {
        log.add(item);
    });

    log.show();
}

run();
