function superType(name, age) {
    this.name = name
    this.age = age
}

superType.prototype.sayName = function () {
    console.log(this.name)
}

function subType() {
}

function subType2() {
}

function subType3(name, age) {
    superType.call(this,name, age)
}

subType.prototype = superType.prototype
subType2.prototype = new superType()

var ins1 = new subType('mike', 22)
var ins2 = new subType2('mike', 22)
var ins3 = new subType3('mike', 22)
console.dir(ins1)
console.dir(ins2)
console.dir(ins3)
