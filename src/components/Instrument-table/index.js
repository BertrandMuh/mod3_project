import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app_context'

import InstrumentTableTemplate from '../intrument-table-template'
import TradeButtons from '../Trade-button'
import './index.css'

const InstrumentTable = () => {
    let url = new URLSearchParams(window.location.search)
    let pair = url.get('pair').replace('_', ' / ')

    let { pairList, favorite, setFavorite, user } = useContext(AppContext)

    // like or unlike the currency pair
    useEffect(() => {
        console.log('table');
        let likeButton = document.getElementsByClassName('fa-heart')[0];

        let favoriteList = [...favorite]
        if (favoriteList.length === 0) {
            likeButton.classList.remove('favorite')
        }
        favoriteList.forEach(itemName => {
            let likeButton = document.getElementsByClassName('fa-heart')[0];
            if (pair === itemName) {
                if (likeButton !== undefined) {
                    console.log(favorite);
                    likeButton.classList.add('favorite')
                }
            }
            else {
                console.log(favorite);
                likeButton.classList.remove('favorite')
            }
        })


    }, [favorite, pair])

    const pairJSX = pairList.map((item, index) => {
        if (item.instrument.replace('_', ' / ') === pair) {
            return (
                <div key={index} className="instrument container">
                    <InstrumentTableTemplate item={item} pair={pair} setFavorite={setFavorite} favorite={favorite} user={user} />
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