//Encapsulate a request as an object, thereby letting you parameterize clients
//with different requests, queue or log requests, and support undoable operations.

//The Command pattern encapsulates actions as objects. Command objects allow for loosely
//coupled systems by separating the objects that issue a request from the objects that
//actually process the request. These requests are called events and the code that
//processes the requests are called event handlers.

//Suppose you are building an application that supports the Cut, Copy, and Paste clipboard actions.
//These actions can be triggered in different ways throughout the app: by a menu system,
//a context menu (e.g. by right clicking on a textbox), or by a keyboard shortcut.

//Command objects allow you to centralize the processing of these actions, one for each operation.
//So, you need only one Command for processing all Cut requests, one for all Copy requests, and
//one for all Paste requests.

//Because commands centralize all processing, they are also frequently involved in handling Undo
//functionality for the entire application.

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

var Command = function (execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

var AddCommand = function (value) {
    return new Command(add, sub, value);
};

var SubCommand = function (value) {
    return new Command(sub, add, value);
};

var MulCommand = function (value) {
    return new Command(mul, div, value);
};

var DivCommand = function (value) {
    return new Command(div, mul, value);
};

var Calculator = function () {
    var current = 0;
    var commands = [];

    function action(command) {
        var name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return {
        execute: function (command) {
            current = command.execute(current, command.value);
            commands.push(command);
            log.add(action(command) + ": " + command.value);
        },

        undo: function () {
            var command = commands.pop();
            current = command.undo(current, command.value);
            log.add("Undo " + action(command) + ": " + command.value);
        },

        getCurrentValue: function () {
            return current;
        }
    }
}

// log helper

var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {
    var calculator = new Calculator();

    // issue commands

    calculator.execute(new AddCommand(100));
    calculator.execute(new SubCommand(24));
    calculator.execute(new MulCommand(6));
    calculator.execute(new DivCommand(2));

    // reverse last two commands

    calculator.undo();
    calculator.undo();

    log.add("\nValue: " + calculator.getCurrentValue());
    log.show();
}

run();
