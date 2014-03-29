module.exports = {
    list: list,
    cons: cons,
    car: car,
    cdr: cdr,
    c_r: c_r,
    foldl: foldl,
    foldr: foldr
};

/*
 * Immutable cons cell constructor
 */
function Cons(left, right) {
    Object.defineProperty(this, 'left', {
        value: left,
        enumerable: true,
        configurable: false,
        writable: false
    });
    Object.defineProperty(this, 'right', {
        value: right,
        enumerable: true,
        configurable: false,
        writable: false
    });
}

/*
 * Convert list to a javascript array.
 */
Cons.prototype.toArray = function toArray() {
    return foldl(function (accumulator, value) {
        return accumulator.push(value), accumulator;
    }, this, []);
};

/*
 * String representation of a list.
 */
Cons.prototype.toString = function () {
    return this.toArray().toString();
};

/*
 * Persistent assignment. Returns a list with the
 * defined index assigned to the provided value.
 */
Cons.prototype.set = function (i, value) {
    return set(this, i, value);
};

/*
 * Apply a function to every value of a list.
 * returns a new list.
 */
Cons.prototype.map = function map(func) {
    return foldr(function (accumulator, value) {
        return cons(func(value), accumulator);
    }, this, null);
};

/*
 * Return a new list in the reverse order of the applied.
 */
Cons.prototype.reverse = function reverse() {
    return foldl(function (accumulator, value) {
        return cons(value, accumulator);
    }, this, null);
};

/*
 * Apply a function to every element of a list
 * returns the same list.
 */
Cons.prototype.foreach = function foreach(func) {
    foldl(function (accumulator, value) {
        func(value);
    }, this, null);
    return this;
};

/*
 * return the x number of elements from a list
 */
Cons.prototype.take = function take(num) {
    if (!num) {
        return null;
    }
    return cons(car(this), cdr(this).take(num - 1));
};

Cons.prototype.foldl = function (func, accumulator) {
    return fold(func, accumulator, this);
};

Cons.prototype.foldr = function (func, accumulator) {
    return foldr(func, accumulator, this);
};

Cons.prototype.cons = function (right) {
    return cons(this, right);
};

Cons.prototype.car = function () {
    return car(this);
};

Cons.prototype.cdr = function () {
    return cdr(this);
};

Cons.prototype.c_r = function (string) {
    return c_r(string, this);
};

/*
 * Function to create a new cons cell.
 */
function cons(left, right) {
    return new Cons(left, right);
}

/*
 * List constructor
 * arguments are used as the values of the list
 */
function list(/*..values*/) {
    var i = arguments.length - 1,
        node = null;
    while (i >= 0) {
        node = new Cons(arguments[i--], node);
    }
    return node;
}

/*
 * Function to return the value of the provided cons cell
 * or in other words the value of the first element of a list.
 */
function car(node) {
    return node ? node.left : null;
}

/*
 * Return the item assigned to the second value of a cons cell.
 */
function cdr(node) {
    return node ? node.right : null;
}

/*
 * Compose multiple car and cdr commands in a single command.
 * cadddr, caadr, caddar, etc.
 */
function c_r(string, node) {
    //break string into an array of a/d steps car/cdr
    return string.split('').reverse().filter(function (str) {
        return str === 'a' || str === 'd';
    }).reduce(function (n, command) {
        return command === 'a' ? car(n) : cdr(n);
    }, node);
}

/*
 * Persistent set. Creates a new immutable list while recycling what it can.
 */
function set(node, i, value) {
    if (i === 0) {
        return cons(value, cdr(node));
    }
    return cons(car(node), set(cdr(node), i - 1, value));
}

/*
 * Recurse through array accumualting values from left to right
 */
function foldl(func, list, accumulator) {
    do {
        accumulator = func(accumulator, car(list));
    } while (list = cdr(list))
    return accumulator;
}

/*
 * Recurse through array accumualting values from right to left
 */
function foldr(func, list, accumulator) {
    if (list === null) {
        return accumulator;
    }
    return func(foldr(func, cdr(list), accumulator), car(list));
}
