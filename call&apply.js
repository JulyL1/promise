Function.prototype.call2 = function (context) {
    var fn = this, key = Symbol
    context[key] = fn
    var args=[].slice.call(arguments,1)
    var res=context[key](...args)
    delete context[key]
    return res
}
function callname() {
    console.log(arguments)
    console.log(this.name)
}
callname.call2({name:'mike'},1,true,[1,2,3,4])
