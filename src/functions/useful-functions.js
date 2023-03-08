


export const getDailyAndWeeklyData = (candles) => {
    let weeklyData = []
    let weeklyNetVolume = 0

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
    let isComplete = candles[0].complete
    let closePrice = isComplete ? candles[0].mid.c : candles[1].mid.c
    let currentPrice = candles[0].mid.c
    let openPrice = candles[0].mid.o
    let highPrice = candles[0].mid.h
    let lowPrice = candles[0].mid.l
    let volume = candles[0].volume
    let bullishOrBearish = currentPrice > openPrice ? 'bullish' : currentPrice < openPrice ? 'bearish' : 'neutral'
    let change = ((currentPrice - openPrice) / openPrice * 100).toFixed(4)
    let weeklyBullishOrBearish, weeklyPriceChange
    if (weeklyData.length > 0) {
        weeklyData.forEach(obj => {
            if (obj.mid.c > obj.mid.o) {
                weeklyNetVolume += obj.volume
            }
            else if (obj.mid.c < obj.mid.o) {
                weeklyNetVolume -= obj.volume
            }
        })
        weeklyBullishOrBearish = weeklyNetVolume > 0 ? 'bullish' : weeklyNetVolume < 0 ? 'bearish' : 'neutral'
        weeklyPriceChange = (weeklyData[weeklyData.length - 1].mid.c - weeklyData[0].mid.o).toFixed(4)
    }
    else {

        weeklyNetVolume = candles[0].volume
        weeklyBullishOrBearish = currentPrice > openPrice ? 'bullish' : currentPrice < openPrice ? 'bearish' : 'neutral'
        weeklyPriceChange = ((candles[0].mid.c - candles[0].mid.o) / candles[0].mid.o * 100).toFixed(4)
    }

    let weeklyBullOrBear = weeklyPriceChange > 0 ? 'bullish' : weeklyPriceChange < 0 ? 'bearish' : 'neutral'

    return { closePrice, openPrice, highPrice, lowPrice, volume, bullishOrBearish, change, weeklyBullOrBear, weeklyBullishOrBearish, weeklyPriceChange, weeklyNetVolume, currentPrice }
}

