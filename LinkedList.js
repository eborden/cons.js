function Cons(left, right) {
    this.left = left;
    this.right = right;
}
Cons.prototype.toArray = function toArray() {
    return foldl(function (accumulator, value) {
        return accumulator.push(value), accumulator;
    }, this, []);
}
Cons.prototype.toString = function () {
    return this.toArray().toString();
}

function cons(left, right) {
    return new Cons(left, right);
}

function car(node) {
    return node ? node.left : null;
}

function cdr(node) {
    return node ? node.right : null;
}

function foldl(func, list, accumulator) {
    do {
        accumulator = func(accumulator, car(list));
    } while (list = cdr(list))
    return accumulator;
}

function foldr(func, list, accumulator) {
    if (list === null) {
        return accumulator;
    }
    return func(foldr(func, cdr(list), accumulator), car(list));
}

function map(func, list) {
    return foldr(function (accumulator, value) {
        return cons(func(value), accumulator);
    }, list, null);
}

function reverse(list) {
    return foldl(function (accumulator, value) {
        return cons(value, accumulator);
    }, list, null);
}

function foreach(func, list) {
    foldl(function (accumulator, value) {
        func(value);
    }, list, null);
    return list;
}

function take(num, list) {
    if (!num) {
        return null;
    }
    return cons(car(list), take(num - 1, cdr(list)));
}

function List(/* lists */) {
    var i = arguments.length - 1,
        node = null;
    while (i >= 0) {
        node = new Cons(arguments[i--], node);
    }
    return node;
}

var list = new List(1, 2, 3, 4, 5, 6),
    mul = map(function (x) {return x * 5;}, list),
    add = map(function (x) {return x + 5;}, mul);

console.log(list);
console.log(list.toArray());
console.log(mul.toArray());
console.log(add.toArray());
console.log(reverse(add).toArray());
console.log(take(3, add).toArray());
console.log(take(3, add).toString());
foreach(function (x) {console.log(x);}, mul);
