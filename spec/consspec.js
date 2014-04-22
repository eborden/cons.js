expect = require('chai').expect;
cons = require('../cons.js');
list = cons.list;
car = cons.car;
cdr = cons.cdr;
c_r = cons.c_r;

describe('Cons', function () {
    var x = list(1, 2, 3, 4, 5, 6);

    it('generates immutable cons cells', function () {
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
    
    it('can convert a list to an array', function () {
        expect([1,2,3,4,5,6]).to.eql(x.toArray());
    });

    it('can get a list\'s length', function () {
        // OOP
        expect(list(1,2,3,4,5,6).length).to.eql(6);
    });

    it('can prepend to a list', function () {
        // OOP
        expect('-1,0,1,2,3,4,5,6').to.eql(x.cons(0).cons(-1).toString());
        
        // Functional
        expect('-1,0,1,2,3,4,5,6').to.eql(cons(-1, cons(0, x)).toString());
    });

    it('can merge lists', function () {
        expect('-1,0,1,2,3,4,5,6').to.eql(cons.merge(list(-1, 0), x).toString());
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
        expect('1,2,88,4,5,6').to.eql(cons.set(2, 88, x).toString());
        expect('1,2,3,4,5,6').to.eql(x.toString());
    });

    it('can map over a list', function () {
        var mul = function (x) {return x * 5;},
            add = function (x) {return x + 5;};
        // OOP
        expect('5,10,15,20,25,30').to.eql(x.map(mul).toString());
        expect('10,15,20,25,30,35').to.eql(x.map(mul).map(add).toString());
        
        // Functional
        expect('5,10,15,20,25,30').to.eql(cons.map(mul, x).toString());
        expect('10,15,20,25,30,35').to.eql(cons.map(add, cons.map(mul, x)).toString());
    });

    it('can fold over a list', function () {
        var add = function (x, y) {return x + y;};
        // OOP
        expect(21).to.eql(x.foldl(add, 0));
        expect(21).to.eql(x.foldr(add, 0));
        
        // Functional
        expect(21).to.eql(cons.foldl(add, 0, x));
        expect(21).to.eql(cons.foldr(add, 0, x));
    });

    it('can reverse a list', function () {
        // OOP
        expect('6,5,4,3,2,1').to.eql(x.reverse().toString());
        
        // Functional
        expect('6,5,4,3,2,1').to.eql(cons.reverse(x).toString());
    });

    it('can extract sections from the front of a list', function () {
        // OOP
        expect('1,2,3').to.eql(x.take(3).toString());
        expect('1,2,3,4').to.eql(x.take(4).toString());
        
        // Functional
        expect('1,2,3').to.eql(cons.take(3, x).toString());
        expect('1,2,3,4').to.eql(cons.take(4, x).toString());
    });

    it('can be iterated over', function () {
        var i = cons.iterator(x);
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

    it('can be iterated with foreach and return the same list', function () {
        // OOP
        i = cons.iterator(x);
        expect(x).to.eqls(x.foreach(function (v) {
            expect(i()).to.eql(v);
        }));

        // Functional
        var i = cons.iterator(x);
        expect(x).to.eqls(cons.foreach(function (v) {
            expect(i()).to.eql(v);
        }, x));
    });

    it.skip('can generate a binary search tree', function () {
    });
});
