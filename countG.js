function countG(arr) {

    let str=arr.map((item)=>to17radio(item))
    return str
}
function to17radio(num) {
    let dataMap={
        10:'A',
        11:'B',
        12:'C',
        13:'D',
        14:'E',
        15:'F',
        16:'G'
    }
    let isNegative=num>=0?true:false
    let resArr=[]
    while(num>17){
        let a=num%17
        num=parseInt(num/17)
        console.log(a)
        if(a>9){
            resArr.push(dataMap[a])
        }else{
            resArr.push(a)
        }
    }
    resArr.push(num)
    // console.log(resArr)
    return resArr.reverse().join('')
    // return
}

var myArray = [0,123, 2121, 32129, 79881];
console.log( countG(myArray))

to17radio(123)
