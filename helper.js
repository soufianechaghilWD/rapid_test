const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getPrevAndNext (idx, iterate){
    const prev = idx - iterate >= 0 ? days[idx - iterate] : days[0]
    const next = idx + iterate < days.length ? days[idx + iterate] : days[days.length - 1]
    return [prev, next]
}

module.exports = {days, getPrevAndNext}