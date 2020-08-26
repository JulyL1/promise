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

function  extend(subclass,superclass) {
    var prototype=Object.create(superclass.prototype)
    dir(prototype)
    prototype.constructor=subclass
    subclass.prototype=prototype
}
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}

// 将父类原型指向子类
extend(SubType, SuperType);
