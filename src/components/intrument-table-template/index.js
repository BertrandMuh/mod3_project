import React, { useEffect } from 'react'

import { getDailyAndWeeklyData } from '../../functions/useful-functions'
import { createOrAddToFavorite, updateTradesLists } from '../serverCall'
import './index.css'

const InstrumentTableTemplate = (props) => {

    let { item, pair, favorite, setFavorite, user, openTrades, closeTrades } = props
    let candles = [...item.candles].reverse() // copy the array contents into a new array and have the latest data at the start of the array
    let pairName = item.instrument.includes('_') ? item.instrument.replace('_', ' / ') : item.instrument
    const addToOrRemoveFromFavorite = () => {

        let favoriteList = [...favorite]
        let newFavoriteList = favoriteList.includes(pair) ? (() => {
            favoriteList.splice(favoriteList.indexOf(pair), 1)
            return favoriteList
        })() : (() => {
            favoriteList.push(pair)
            return favoriteList
        })()
        setFavorite(newFavoriteList)
    }


    let daily = getDailyAndWeeklyData(candles)
    return (
        <>
            <p className='pair-name'>
                <span>
                    {pairName}
                </span>
                <i className="fa fa-heart" onClick={addToOrRemoveFromFavorite}></i>
            </p>
            <div className='instru-details'>
                <div>
                    <p className='price-label'>Current price</p>
                    <p>{daily.currentPrice}</p>
                </div>
                <div>
                    <p className='price-label'>Open</p>
                    <p>{daily.openPrice}</p>
                </div>
                <div>
                    <p className='price-label'>High</p>
                    <p>{daily.highPrice}</p>
                </div>
                <div>
                    <p className='price-label'>Low</p>
                    <p>{daily.lowPrice}</p>
                </div>
                <div>
                    <p className='price-label'>Previous close</p>
                    <p >{daily.closePrice}</p>
                </div>
                <div>
                    <p className='price-label'>Daily net volume</p>
                    <p className={daily.bullishOrBearish}>{daily.volume}</p>
                </div>
                <div>
                    <p className='price-label'>Daily Price change</p>
                    <p className={daily.bullishOrBearish}>{daily.change}%</p>
                </div>
                <div>
                    <p className='price-label'>Weekly net volume</p>
                    <p className={daily.weeklyBullishOrBearish}>{Math.abs(daily.weeklyNetVolume)}</p>
                </div>

                <div>
                    <p className='price-label'>Weekly Price change</p>
                    <p className={daily.weeklyBullOrBear}>{daily.weeklyPriceChange}%</p>
                </div>
            </div>
        </>
    )
}

export default InstrumentTableTemplate