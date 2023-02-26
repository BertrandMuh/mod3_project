import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'

const Currencies = () => {
    let path = '/trading-avenue/instrument/?pair='


    let { pairList } = useContext(AppContext)

    const pairsJSX = pairList.map((item, index) => {
        let route = path + item.instrument
        let closePrice = item.candles[0].mid.c
        let openPrice = item.candles[0].mid.o
        let highPrice = item.candles[0].mid.h
        let lowPrice = item.candles[0].mid.l
        let bullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
        if (item) {
            return (
                <Link to={route} key={index} className="fx-pair">
                    <p className='pair-name'>
                        {item.instrument.includes('_') ? item.instrument.replace('_', ' / ') : item.instrument}
                    </p>
                    <p >{openPrice}</p>
                    <p >{highPrice}</p>
                    <p >{lowPrice}</p>
                    <p className={bullishOrBearish}>{closePrice}</p>
                </Link>
            )
        }
        else {
            return null
        }
    })

    return (
        <div className='home-price-detail'>
            <div className='fx-pair header'>
                <h5>Pairs</h5>
                <h5>Open</h5>
                <h5>High</h5>
                <h5>Low</h5>
                <h5>Close</h5>
            </div>
            {pairsJSX}
        </div>
    )
}

export default Currencies