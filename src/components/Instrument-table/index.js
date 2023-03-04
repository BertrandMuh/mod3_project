import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app_context'

import InstrumentTableTemplate from '../intrument-table-template'
import TradeButtons from '../Trade-button'
import './index.css'

const InstrumentTable = () => {
    let url = new URLSearchParams(window.location.search)
    let pair = url.get('pair').replace('_', ' / ')

    let { pairList, favorite, setFavorite } = useContext(AppContext)

    // like or unlike the currency pair
    useEffect(() => {
        console.log(favorite);
        let favoriteList = [...favorite]
        if (favoriteList.length > 0) {
            let likeButton = document.getElementsByClassName('fa-heart')[0];
            favoriteList.forEach(itemName => {
                if (pair === itemName) {
                    if (likeButton !== undefined) {
                        likeButton.classList.add('favorite')
                    }
                }
                else {
                    likeButton.classList.remove('favorite')
                }
            })
        }
    }, [favorite, pair])

    const pairJSX = pairList.map((item, index) => {
        if (item.instrument.replace('_', ' / ') === pair) {
            return (
                <div key={index} className="instrument container">
                    <InstrumentTableTemplate item={item} pair={pair} setFavorite={setFavorite} favorite={favorite} />
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