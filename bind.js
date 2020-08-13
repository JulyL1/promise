Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    let self = this
    let args = Array.prototype.slice.call(arguments, 1)

    function fn() {
        var bindArgs = Array.prototype.slice.call(arguments);
        //this instanceof fn 用来看是否是通过new生成的新对象
        return self.apply(this instanceof fn ? this : context
            , args.concat(bindArgs))
    }

    var empty = function () {
    }
    empty.prototype = self.prototype
    fn.prototype = new empty()
    return fn
}
var habbit = "basketball"

function bark(name, age) {
    this.name = name
    this.age = age
    console.log('name' + this.name)
    console.log('age' + this.age)
    console.log('habbit' + this.habbit)
}

var test = {habbit: 'footbal'}
var fn = bark.bind2(test, 'mike')
var ins1 = new fn(11)
console.dir(ins1)
