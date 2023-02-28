import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/app_context'
import { getWeeklyBullAndBearVolume, getWeeklyData } from '../functions/useful-functions'
import TradeButtons from '../Trade-button'
import './index.css'

const InstrumentTable = () => {
    let url = new URLSearchParams(window.location.search)
    let pair = url.get('pair')

    let { pairList } = useContext(AppContext)

    const pairJSX = pairList.map((item, index) => {
        if (item.instrument === pair) {
            let candles = [...item.candles].reverse() // copy the array contents into a new array and have the latest data at the start of the array

            let WeeklyData = getWeeklyData(candles)

            let isComplete = candles[0].complete
            let closePrice = isComplete ? candles[0].mid.c : candles[1].mid.c
            let openPrice = isComplete ? candles[0].mid.o : candles[1].mid.o
            let highPrice = isComplete ? candles[0].mid.h : candles[1].mid.h
            let lowPrice = isComplete ? candles[0].mid.l : candles[1].mid.l
            let volume = isComplete ? candles[0].volume : candles[1].volume
            let netWeeklyVolume = getWeeklyBullAndBearVolume(WeeklyData)
            let bullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
            let weeklyBullishOrBearish = netWeeklyVolume > 0 ? 'bullish' : netWeeklyVolume < 0 ? 'bearish' : 'neutral'
            let change = ((closePrice - openPrice) / openPrice * 100).toFixed(2) + '%'
            let weeklyPriceChange = WeeklyData.length > 1 ? WeeklyData[WeeklyData.length - 1].mid.c - WeeklyData[0].mid.o : ((WeeklyData[0].mid.c - WeeklyData[0].mid.o) / WeeklyData[0].mid.o * 100).toFixed(2) + '%'

            let weeklyBullOrBear = WeeklyData[WeeklyData.length - 1].mid.c > WeeklyData[0].mid.o ? 'bullish' : WeeklyData[WeeklyData.length - 1].mid.c < WeeklyData[0].mid.o ? 'bearish' : 'neutral'

            return (
                <div key={index} className="instrument">
                    <h3 className='pair-name'>
                        {item.instrument.includes('_') ? item.instrument.replace('_', ' / ') : item.instrument}
                    </h3>
                    <div className='instru-details'>
                        <div>
                            <p className='price-label'>Open</p>
                            <p>{openPrice}</p>
                        </div>
                        <div>
                            <p className='price-label'>High</p>
                            <p>{highPrice}</p>
                        </div>
                        <div>
                            <p className='price-label'>Low</p>
                            <p>{lowPrice}</p>
                        </div>
                        <div>
                            <p className='price-label'>Close</p>
                            <p >{closePrice}</p>
                        </div>
                        <div>
                            <p className='price-label'>Daily net volume</p>
                            <p className={bullishOrBearish}>{volume}</p>
                        </div>
                        <div>
                            <p className='price-label'>Weekly net volume</p>
                            <p className={weeklyBullishOrBearish}>{Math.abs(netWeeklyVolume)}</p>
                        </div>
                        <div>
                            <p className='price-label'>Daily Price change</p>
                            <p className={bullishOrBearish}>{change}</p>
                        </div>
                        <div>
                            <p className='price-label'>Weekly Price change</p>
                            <p className={weeklyBullOrBear}>{weeklyPriceChange}</p>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    })
    return (
        <div className='pair-details-container'>
            {pairJSX}
            <TradeButtons />
        </div>
    )
}

export default InstrumentTable