export const getWeeklyData = (candles) => {
    let weeklyData = []
    if (new Date().toUTCString().includes('Sat')) {

        for (let i = 0; i < 5; i++) {
            weeklyData.push(candles[i])
        }
    }
    else {
        for (let i = 0; i < 5; i++) {
            if (candles[i].complete) {
                weeklyData.push(candles[i])
            }
            if (new Date(candles[i].time).toUTCString().includes('Sun')) {
                break
            }
        }
    }
    return weeklyData
}

export const getWeeklyBullAndBearVolume = (WeeklyData) => {

    let netVolume = 0

    WeeklyData.forEach(obj => {
        if (obj.mid.c > obj.mid.o) {
            netVolume += obj.volume
        }
        else if (obj.mid.c < obj.mid.o) {
            netVolume -= obj.volume
        }
    })
    return netVolume
}