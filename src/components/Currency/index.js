import React, { useContext } from 'react'
import { AppContext } from '../../context/app_context'
import { Link } from 'react-router-dom'
import './index.css'

const Currencies = () => {
    let path = '/trading-avenue.com/instrument/?pair='


    let { pairList } = useContext(AppContext)

    const pairsJSX = pairList.map((item, index) => {

        let route = path + item.instrument
        let candles = [...item.candles].reverse()
        let closePrice = candles[0].mid.c
        let openPrice = candles[0].mid.o
        let volume = candles[0].volume
        let bullishOrBearish = closePrice > openPrice ? 'bullish' : closePrice < openPrice ? 'bearish' : 'neutral'
        if (item) {
            return (
                <Link to={route} key={index} className="fx-pair">
                    <p className='pair-name'>
                        {item.instrument.includes('_') ? item.instrument.replace('_', ' / ') : item.instrument}
                    </p>
                    <p >{openPrice}</p>
                    <p className={bullishOrBearish}>{closePrice}</p>
                    <p className={bullishOrBearish + ' volume'}>{volume}</p>
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
                <h6>Pairs</h6>
                <h6>Open</h6>
                <h6>Close</h6>
                <h6 className='volume'>Volume</h6>
            </div>
            {pairsJSX}
        </div>
    )
}

export default Currencies