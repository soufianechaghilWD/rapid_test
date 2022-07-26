const {solution} = require('./solution')
const {days, getPrevAndNext} = require('./helper')

const checkExistingValuesInDictionary = (keys, D, result) => {
    
    const alreadyChecked = []

    for (let i = 0; i < keys.length; i++){
        const currentKey = keys[i]
        var totalVal = D[`${currentKey}`]  
        const date = new Date(currentKey)
        const day = date.getDay()
        const nameOfTheDay = days[day]      

        if(!alreadyChecked.find(checked => checked === day)){
            
            for(let j = i+1; j < keys.length; j++){
                const tmpKey = keys[j]
                const tmpDate = new Date(tmpKey)
                const tmpDay = tmpDate.getDay()
    
                if (tmpDay === day) {
                    totalVal+= D[`${tmpKey}`]
                }
            }
    
            if (result[`${nameOfTheDay}`] !== totalVal)  return false 

            alreadyChecked.push(day)
        }
    }
}


const checkMissingValuesInDictionary = (keys, result) => {
    // getting the days that are not provided in dictionary
    var daysNotInDictionaryIdx = []
    for(let i = 0; i < 6; i++) daysNotInDictionaryIdx.push(i)
    for(let j = 0; j < keys.length; j++){
        const currentKey = keys[j]
        const date = new Date(currentKey)
        const day = date.getDay()
        daysNotInDictionaryIdx[day] = undefined
    }
    daysNotInDictionaryIdx = daysNotInDictionaryIdx.filter(tmp => tmp !== undefined)


    // check the value of each day not provided in the dictionary
    for(let k = 0; k < daysNotInDictionaryIdx.length; k++){
        const currentIdx = daysNotInDictionaryIdx[k]
        const dayName = days[currentIdx]
        var iterate = 1
        var [prev, next] = getPrevAndNext(currentIdx, iterate) 
        
        while(result[`${prev}`] === undefined || result[`${next}`] === undefined){
            iterate++
            [prev, next] = getPrevAndNext(currentIdx, iterate)
        }

        const shouldBeVal = (result[`${prev}`] + result[`${next}`]) / 2

        if (shouldBeVal !== result[`${dayName}`]) return false
        
    }
}


function testSolution (D) {

    const result = solution(D)
    const keys = Object.keys(D)


    // check if every day is in the result
    for (let k = 0; k < days.length; k++ ){
        const day = days[k]
        if (result[`${day}`] === undefined) return false
    }

    // check for every day provided in the input that the correct answer is in result
    checkExistingValuesInDictionary(keys, D, result)


    // check if a day is not provided that the result value is right
    checkMissingValuesInDictionary(keys, result)

    return true
    

}

// The provided inputs in the form
const D1 = {"2020-01-01": 4, "2020-01-02": 4, "2020-01-03": 6, "2020-01-04": 8, "2020-01-05": 2, "2020-01-06": -6, "2020-01-07": 2, "2020-01-08": -2}
const D = {"2020-01-01": 6, "2020-01-04": 12, "2020-01-05": 14, "2020-01-06": 2, "2020-01-07": 4}

// running the test on the provided inputs
console.log(testSolution(D1))
console.log(testSolution(D))

// logging out the results for the inputs
// console.log(solution(D1))
// console.log(solution(D))
