// const numsToSum = [ 1 , 2, 3, 4, 5, 6, 7, 8 , 9 ,10 ];


// let x = 0
// let num = 0
// const sumNumbers = ( numsArr ) => {
//  let i = numsArr.length
//  if (x<i){
//     num += numsArr[x]
//     x+=1
//     sumNumbers(numsToSum)
//  } else {
//     console.log(num)
//     return num
//  }
// }
// sumNumbers(numsToSum)


const arr = [1 ,2 ,[3 ,4, [5,[6]],7],8, [9, 10]];

// const flatten =( param, newArr )=>{
//     newArr = newArr || []
//     if(param.length===0){
//     return newArr
//     } 
//      const first = param[0] 
//      const rest = param.slice(1)
//      if(Array.isArray(first)===false){
//      newArr.push(first)
//      return flatten(rest)
//     } else {
//      const nestedfirst = first[0]
//      const nestedrest = first.slice(1)
//     newArr.push(nestedfirst)
//     return flatten(rest)
//     } 
// }

const flatten =(arr)=>{
    const first = arr[0]
    if (arr.length===1){
        if (typeof first === "object"){
            return flatten(first)
        } else{
        return [first]
        }
    }
    const rest = arr.slice(1)
    const newArr = flatten(rest)

    if (typeof first === "number"){
        return [first].concat(newArr)
    } else {
        return flatten(first).concat(newArr)
    }
}

console.log(flatten (arr));

// [ 1 , 2, 3, 4, 5, 6, 7, 8 , 9 ,10 ];
