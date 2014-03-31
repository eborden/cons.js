expect = require('chai').expect;
l = require('../LinkedList.js');
list = l.list;
cons = l.cons;
car = l.car;
cdr = l.cdr;
c_r = l.c_r;

describe('LinkedList', function () {
    var x = list(1, 2, 3, 4, 5, 6);

    it('is generated with immutable cons cells', function () {
        var c = cons(5, 6);
        expect(c.car).to.eql(5);
        expect(c.cdr).to.eql(6);

        c.car = 10;
        expect(c.car).to.eql(5);
        
        c.cdr = 10;
        expect(c.cdr).to.eql(6);
    });

    it('can create a simple list', function () {
        expect('1,2,3,4,5,6').to.eql(x.toString());
    });

    it('can create non homogenius lists', function () {
        expect('1,foo,[object Object],0.5').to.eql(list(1, 'foo', {}, 0.5).toString());
    });
    
    it('can prepend to a list', function () {
        // OOP
        expect('-1,0,1,2,3,4,5,6').to.eql(x.cons(0).cons(-1).toString());
        // Functional
        expect('-1,0,1,2,3,4,5,6').to.eql(cons(-1, cons(0, x)).toString());
    });

    it('can merge lists', function () {
        expect('-1,0,1,2,3,4,5,6').to.eql(l.merge(list(-1, 0), x).toString());
    });

    it('can access members of that list', function () {
        // OOP
        expect('1').to.eql(x.car.toString());
        expect('2,3,4,5,6').to.eql(x.cdr.toString());
        expect('4').to.eql(x.c_r('addd').toString());

        // Functional
        expect('1').to.eql(car(x).toString());
        expect('2,3,4,5,6').to.eql(cdr(x).toString());
        expect('4').to.eql(c_r('addd', x).toString());
    });

    it('can immutably edit a list', function () {
        // OOP
        expect('1,2,88,4,5,6').to.eql(x.set(2, 88).toString());
        expect('1,2,3,4,5,6').to.eql(x.toString());
        
        // Functional
        expect('1,2,88,4,5,6').to.eql(l.set(x, 2, 88).toString());
        expect('1,2,3,4,5,6').to.eql(x.toString());
    });

    it('can map over a list', function () {
        var mul = function (x) {return x * 5;},
            add = function (x) {return x + 5;};
        // OOP
        expect('5,10,15,20,25,30').to.eql(x.map(mul).toString());
        expect('10,15,20,25,30,35').to.eql(x.map(mul).map(add).toString());
        
        // Functional
        expect('5,10,15,20,25,30').to.eql(l.map(mul, x).toString());
        expect('10,15,20,25,30,35').to.eql(l.map(add, l.map(mul, x)).toString());
    });

    it('can fold over a list', function () {
        var add = function (x, y) {return x + y;};
        // OOP
        expect(17).to.eql(x.foldl(add));
        expect(17).to.eql(x.foldr(add));
        
        // Functional
        expect(17).to.eql(l.foldl(add, x));
        expect(17).to.eql(l.foldr(add, x));
    });

    it('can reverse a list', function () {
        // OOP
        expect('6,5,4,3,2,1').to.eql(x.reverse().toString());
        
        // Functional
        expect('6,5,4,3,2,1').to.eql(l.reverse(x).toString());
    });

    it('can extract sections from the front of a list', function () {
        // OOP
        expect('1,2,3').to.eql(x.take(3).toString());
        expect('1,2,3,4').to.eql(x.take(4).toString());
        
        // Functional
        expect('1,2,3').to.eql(l.take(3, x).toString());
        expect('1,2,3,4').to.eql(l.take(4, x).toString());
    });

    it('can be iterated over', function () {
        var i = l.iterator(x);
        expect(i()).to.eql(1);
        expect(i()).to.eql(2);
        expect(i()).to.eql(3);
        expect(i()).to.eql(4);
        expect(i()).to.eql(5);
        expect(i()).to.eql(6);
        expect(i()).to.eql(undefined);
        expect(i()).to.eql(undefined);
        expect(i()).to.eql(undefined);
    });
});
