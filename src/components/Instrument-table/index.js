import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app_context'

import InstrumentTableTemplate from '../intrument-table-template'
import TradeButtons from '../Trade-button'
import './index.css'

const InstrumentTable = () => {
    let url = new URLSearchParams(window.location.search)
    let pair
    if (url.get('pair')) {
        pair = url.get('pair').replace('_', ' / ')
    }

    let { pairList, favorite, setFavorite, user, openTrades, closeTrades } = useContext(AppContext)

    // like or unlike the currency pair
    useEffect(() => {

        let likeButton = document.getElementsByClassName('fa-heart')[0];

        if (favorite !== undefined) {

            let favoriteList = [...favorite]

            if (favoriteList.includes(pair)) {
                if (!likeButton.classList.contains('favorite')) {
                    likeButton.classList.add('favorite')
                }
            }
            else if (!favoriteList.includes(pair)) {
                if (likeButton.classList.contains('favorite')) {
                    likeButton.classList.remove('favorite')
                }
            }
        }
    }, [favorite, pair])
    let element
    const pairJSX = pairList.map((item, index) => {
        if (item.instrument.replace('_', ' / ') === pair) {
            element = [...item.candles].reverse()
            return (
                <div key={index} className="instrument container">
                    <InstrumentTableTemplate item={item} pair={pair} setFavorite={setFavorite} favorite={favorite} user={user} openTrades={openTrades} closeTrades={closeTrades} />
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
            <TradeButtons item={element} />
        </div>
    )
}

export default InstrumentTable