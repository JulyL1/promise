var deepClone = function (source, map = new WeakMap()) {
    // 如果为空直接返回
    if (source === null) return null
    // 如果不是对象类型，比如string，number等，直接返回
    if (Object.prototype.toString.call(source) !== '[object Object]') return source
    // 解决循环引用问题，如果这个key已经有了，就不重复复制。
    if (map.has(source)) return map.get(source)
    //clone数组
    let target = Array.isArray(source) ? [] : {};
    map.set(source, target)
    var SymbolKeys = Object.getOwnPropertySymbols(source)
    for (let key of SymbolKeys) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object') {
                target[key] = deepClone(source[key], map)
            } else {
                target[key] = source[key];
            }
        }
    }
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object') {
                target[key] = deepClone(source[key], map)
            } else {
                target[key] = source[key];
            }
        }
    }
    return target
}
var symbol = Symbol('test')
var source = {
    array: [1, 2, 3, 4, 5],
    bol: false,
    str: 'str',
    [symbol]: 'test symbol',
    obj: {
        array: [1, 2, 3, 4, 5],
        bol: false,
        str: 'str',
    }
}
source.obj.obj = source.obj
var target = deepClone(source)
console.dir(target)
console.dir(Object.getOwnPropertySymbols(target))
// source.obj.bol = true
