import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context'
import { Link } from 'react-router-dom'
import './index.css'

const Currencies = () => {

    let { pairList } = useContext(AppContext)

    const pairJSX = pairList.map((item, index) => {
        let route = `/currency/?pair=${item.instrument}`
        let closePrice = item.candles[0].mid.c
        let openPrice = item.candles[0].mid.o
        let highPrice = item.candles[0].mid.h
        let lowPrice = item.candles[0].mid.l
        let bullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
        if (item) {
            return (
                <div key={index} className="fx-pair">
                    <Link to={route} className='link'>
                        <p className='pair-name'>{item.instrument}</p>
                    </Link>
                    <p>{openPrice}</p>
                    <p>{highPrice}</p>
                    <p>{lowPrice}</p>
                    <p className={bullishOrBearish}>{closePrice}</p>
                </div>
            )
        }
        else {
            return null
        }
    })

    return (
        <div className='home-price-detail'>
            <div className='fx-pair header'>
                <h3>Pairs</h3>
                <h3>Open</h3>
                <h3>High</h3>
                <h3>Low</h3>
                <h3>Close</h3>
            </div>
            {pairJSX}
        </div>
    )
}

export default Currencies