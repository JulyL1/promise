// setImmediate(function () {
//     console.log(1);
// }, 0);
// setTimeout(function () {
//     console.log(2);
// }, 0);
// new Promise(function (resolve) {
//     console.log(3);
//     resolve();
//     console.log(4);
// }).then(function () {
//     console.log(5);
// });
// console.log(6);
// process.nextTick(
//function () {
//     console.log(7);
// });
// console.log(8);

let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]
console.log(...arr)

const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))

var hammingDistance = function (x, y) {
    var count = 0, num = x ^ y
    while (num > 0) {
        num = num >> 1

        console.log(num)
        if ((num && 1) == 1) {
            count++
            console.log('-----')
            console.log(count)
        }

    }
    return count

};
hammingDistance(1, 4)
