import axios from 'axios'

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
    let openPrice = isComplete ? candles[0].mid.o : candles[1].mid.o
    let highPrice = isComplete ? candles[0].mid.h : candles[1].mid.h
    let lowPrice = isComplete ? candles[0].mid.l : candles[1].mid.l
    let volume = isComplete ? candles[0].volume : candles[1].volume
    let bullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
    let change = ((closePrice - openPrice) / openPrice * 100).toFixed(4)
    let weeklyBullishOrBearish
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
    }
    else {

        weeklyNetVolume = isComplete ? candles[0].volume : candles[1].volume
        weeklyBullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
    }

    let weeklyPriceChange = weeklyData.length > 1 ? (weeklyData[weeklyData.length - 1].mid.c - weeklyData[0].mid.o).toFixed(4) : ((candles[1].mid.c - candles[1].mid.o) / candles[1].mid.o * 100).toFixed(4)
    let weeklyBullOrBear = weeklyPriceChange > 0 ? 'bullish' : weeklyPriceChange < 0 ? 'bearish' : 'neutral'


    return { closePrice, openPrice, highPrice, lowPrice, volume, bullishOrBearish, change, weeklyBullOrBear, weeklyBullishOrBearish, weeklyPriceChange, weeklyNetVolume }
}

