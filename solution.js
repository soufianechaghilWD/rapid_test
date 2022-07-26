const {days, getPrevAndNext} = require('./helper')

function solution(D){

    const result = {"Mon": undefined, "Tue": undefined, "Wed": undefined, "Thu": undefined, "Fri": undefined, "Sat": undefined, "Sun": undefined}

    // adding corresponding value to the result
    for (const key in D){
        const date = new Date(key)
        const day = days[date.getDay()]
        const valAtDay = result[`${day}`] || 0
        result[`${day}`] = valAtDay + D[`${key}`]
    }


    // check if a day does not exist in input dictionary and set its value to the mean of prev and next
    for (const day in result){
        const val = result[`${day}`]

        if (val === undefined){
            const idx = days.indexOf(day)
            var iterate = 1;

            var [prev, next] = getPrevAndNext(idx, iterate)
            

            while (result[`${prev}`] === undefined || result[`${next}`] === undefined){
                iterate++
                [prev, next] = getPrevAndNext(idx, iterate)
            }

            result[`${day}`] = (result[`${prev}`] + result[`${next}`]) / 2

        }

    }

    return result

}

module.exports = {solution}
