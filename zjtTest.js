
// 模仿bind
Function.prototype.bind2 = function(context) {
    if(typeof this !== 'function') {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
    }

    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);

    let fBound = function () {
        let bindArgs = Array.prototype.slice.call(arguments);

        return self.apply(
            this instanceof fBound ? this : context,
            args.concat(bindArgs)
        )
    };

    let fNOP = function() {};
    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    // 或使用 ES5的 Object.create()方法生成一个新对象
    // fBound.prototype = Object.creat(self.prototype)

    return fBound
};


// Javascript常用八种继承方案
/**
 * 1、原型链继承
 * @constructor
 * 缺点：多个实例对引用类型的操作会被篡改
 */
console.log('-------- 1、原型链继承 -------');
function SuperType1() {
    this.property = true
}
SuperType1.prototype.getSuperValue = function () {
    return this.property
};
function SubType1() {
    this.subproperty = false
}
SubType1.prototype = new SuperType1();
SubType1.prototype.getSubValue = function () {
    return this.subproperty
};
var instance = new SubType1();
console.log(instance.getSuperValue()); // true
/**
 * eg:
 */
// function  SuperType(){
//     this.color=["red","green","blue"];
//     this.name = 'super';
// }
// function  SubType(){}
// SubType.prototype = new SuperType();
// var instance1 = new SubType();
// instance1.color.push("black");
// instance1.name = 'changeSuper';
// console.log(instance1.color); //"red,green,blue,black"
// console.log(instance1.name); // changeSuper
//
// var instance2 = new SubType();
// console.log(instance2.color); //"red,green,blue"
// console.log(instance2.name); // super


/**
 * 2、借用构造函数继承
 * @constructor
 * 缺点：只能继承父类的实例属性和方法，不能继承原型属性和方法
 *      无法实现复用，每个子类都有父类实例函数的副本，影响性能
 */
console.log('-------- 2、借用构造函数继承 -------');
function  SuperType2(){
    this.color=["red","green","blue"];
    this.name = 'super';
}
function  SubType2(){
    //继承自SuperType
    SuperType2.call(this);
}
var instance2_1 = new SubType2();
instance2_1.color.push("black");
instance2_1.name = 'changeSuper';
console.log(instance2_1.color); //"red,green,blue,black"
console.log(instance2_1.name); // changeSuper

var instance2_2 = new SubType2();
console.log(instance2_2.color); //"red,green,blue"
console.log(instance2_2.name); // super


/**
 * 3、组合继承 (用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承)
 * @constructor
 * 缺点：在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法
 */
console.log('-------- 3、组合继承 -------');
function SuperType3(name) {
    this.name = name;
    this.colors = ['red', 'green', 'blue'];
}
SuperType3.prototype.sayName = function () {
    console.log(this.name)
};
function SubType3(name, age) {
    // 继承属性
    // 第二次调用SuperType3
    SuperType3.call(this, name);
    this.age = age;
}
// 继承方法
// 构建原型链
// 第一次调用SuperType3()
SubType3.prototype = new SuperType3();
// 重写SubType3.prototype的constructor属性，指向自己的构造函数SubType
SubType3.prototype.constructor = SubType3;
SubType3.prototype.sayAge = function(){
    console.log(this.age);
};

var instance3_1 = new SubType3("Nicholas", 29);
instance3_1.colors.push("black");
console.log(instance3_1.colors); // [ 'red', 'green', 'blue', 'black' ]
instance3_1.sayName(); // "Nicholas";
instance3_1.sayAge(); // 29

var instance3_2 = new SubType3("Greg", 27);
console.log(instance3_2.colors); // [ 'red', 'green', 'blue' ]
instance3_2.sayName(); // "Greg";
instance3_2.sayAge(); // 27



