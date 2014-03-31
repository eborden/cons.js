module.exports = cons;

/*
 * Immutable cons cell constructor
 */
function Cons(car, cdr) {
    Object.defineProperty(this, 'car', {
        value: car,
        enumerable: true,
        configurable: false,
        writable: false
    });
    Object.defineProperty(this, 'cdr', {
        value: cdr,
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
    }, [], this);
};

/*
 * String representation of a list.
 */
Cons.prototype.toString = function () {
    return this.toArray().toString();
};

/*
 * OOP methods of Cons
 */
Cons.prototype.set = function (i, value) {
    return set(this, i, value);
};
Cons.prototype.map = function (func) {
    return map(func, this);
};
Cons.prototype.reverse = function () {
    return reverse(this);
};
Cons.prototype.foreach = function (func) {
    return foreach(func, this);
};
Cons.prototype.take = function (num) {
    return take(num, this);
};
Cons.prototype.foldl = function (func, accumulator) {
    return foldl(func, accumulator, this);
};
Cons.prototype.foldr = function (func, accumulator) {
    return foldr(func, accumulator, this);
};
Cons.prototype.cons = function (car) {
    return cons(car, this);
};
Cons.prototype.c_r = function (string) {
    return c_r(string, this);
};

/*
 * Function to create a new cons cell.
 */
function cons(car, cdr) {
    return new Cons(car, cdr);
}
/*
 * Static functional methods of cons
 */
cons.binaryTree = binaryTree;
cons.list = list;
cons.iterator = iterator;
cons.car = car;
cons.cdr = cdr;
cons.c_r = c_r;
cons.foldl = foldl;
cons.foldr = foldr;
cons.map = map;
cons.reverse = reverse;
cons.take = take;
cons.foreach = foreach;
cons.set = set;
cons.merge = merge;    

/*
 * Create a binary search tree
 */
function binaryTree(/*..values*/) {
    /*
     * Not implemented
     */
}

/*
 * List constructor
 * arguments are used as the values of the list
 */
function list(/*..values*/) {
    var i = arguments.length - 1,
        node = undefined;
    while (i >= 0) {
        node = new Cons(arguments[i--], node);
    }
    return node;
}

/*
 * Return iterator function
 */
function iterator(list) {
    return function () {
        var value = car(list);
        list = cdr(list);
        return value;
    };
}

/*
 * Function to return the first value of the provided cons cell
 * or in other words the value of the first element of a list.
 */
function car(node) {
    return node ? node.car : undefined;
}

/*
 * Return the item assigned to the second value of a cons cell.
 */
function cdr(node) {
    return node ? node.cdr : undefined;
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
function foldl(func, accumulator, list) {
    do {
        accumulator = func(accumulator, car(list));
    } while (list = cdr(list))
    return accumulator;
}

/*
 * Recurse through array accumualting values from right to left
 */
function foldr(func, accumulator, list) {
    if (list === undefined) {
        return accumulator;
    }
    return func(foldr(func, accumulator, cdr(list)), car(list));
}
/*
 * Apply a function to every value of a list.
 * returns a new list.
 */
function map(func, list) {
    return foldr(function (accumulator, value) {
        return cons(func(value), accumulator);
    }, undefined, list);
}

/*
 * Return a new list in the reverse order of the applied.
 */
function reverse(list) {
    return foldl(function (accumulator, value) {
        return cons(value, accumulator);
    }, undefined, list);
}

/*
 * Apply a function to every element of a list
 * returns the same list.
 */
function foreach(func, list) {
    foldl(function (accumulator, value) {
        func(value);
    }, undefined, list);
    return list;
}

/*
 * return the x number of elements from a list
 */
function take(num, list) {
    if (!num) {
        return undefined;
    }
    return cons(car(list), cdr(list).take(num - 1));
}

/*
 * Merge two lists, the first list is recreated, the second is persistent
 */
function merge(list1, list2) {
    return foldr(function (list, v) {
        return cons(v, list);
    }, list2, list1);
}
