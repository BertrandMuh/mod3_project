import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app_context'
import { getFavorite, getFavoritesAndTrades } from '../serverCall'
import './index.css'

const Watchlist = (props) => {
    const { favorite } = props
    const { user, setFavorite, openTrade, setOpenTrade } = useContext(AppContext)

    let listJSX
    if (favorite !== undefined) {
        let favoriteList = [...favorite]
        listJSX = favoriteList.map((item) => {
            return (
                <div className='favorite-pair' key={item}>
                    <p className='fav-pair-name'>{item}</p>
                    <i className="fa fa-trash-o"></i>
                </div>
            )
        })
    }

    return (
        <div id='favorite-container'>
            <p className='title'>Favorites</p>
            {listJSX}
        </div>
    )
}

export default Watchlist