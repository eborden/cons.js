l = require('../LinkedList.js');
list = l.list;
cons = l.cons;
c_r = l.c_r;
assert = {
    equals: function equals(expects, value) {
        if (expects != value) {
            throw new Error('Expected ' + expects + ' and saw ' + value.toString());
        }
    }
};
function describe(desc, func) {
    try {
        func();
    } catch (e) {
        console.log(desc + ': ' + e.message);
    }
}

describe('foo', function () {
    var x = list(1, 2, 3, 4, 5, 6),
        mul = x.map(function (x) {return x * 5;}),
        add = mul.map(function (x) {return x + 5;});

    assert.equals('4', c_r('addd', x));
    assert.equals('4', x.c_r('addd'));
    assert.equals('1,2,3,4,5,6', x);
    assert.equals('-1,0,1,2,3,4,5,6', cons(-1, cons(0, x)));
    assert.equals('5,10,88,20,25,30', mul.set(2, 88));
    assert.equals('5,10,15,20,25,30', mul);
    assert.equals('10,15,20,25,30,35', add);
    assert.equals('35,30,25,20,15,10', add.reverse());
    assert.equals('10,15,20', add.take(3));
    assert.equals('10,15,20', add.take(3));
});
