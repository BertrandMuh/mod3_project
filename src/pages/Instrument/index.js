import React, { useContext } from 'react'
import Analysis from '../../components/Analysis'
import { AppContext } from '../../context/app_context'
import './index.css'

const Instrument = () => {
    let url = new URLSearchParams(window.location.search)
    let pair = url.get('pair')

    let { pairList } = useContext(AppContext)

    const pairJSX = pairList.map((item, index) => {
        let closePrice = item.candles[0].mid.c
        let openPrice = item.candles[0].mid.o
        let highPrice = item.candles[0].mid.h
        let lowPrice = item.candles[0].mid.l
        let bullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
        let change = ((closePrice - openPrice) / openPrice * 100).toFixed(2)

        if (item.instrument === pair) {
            return (
                <div key={index} className="instrument">
                    <h3 className='pair-name'>
                        {item.instrument.includes('_') ? item.instrument.replace('_', ' / ') : item.instrument}
                    </h3>
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
                        <p className={bullishOrBearish}>{closePrice}</p>
                    </div>
                    <div>
                        <p className='price-label'>Change</p>
                        <p className={bullishOrBearish}>{change}</p>
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    })

    return (
        <>
            <Analysis />
            {pairJSX}
        </>
    )
}

export default Instrument