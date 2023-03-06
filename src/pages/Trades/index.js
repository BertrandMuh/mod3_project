import React, { useContext, useEffect } from 'react'
import OpenTrades from '../../components/Open_trades'
import { getFavoritesAndTrades } from '../../components/serverCall'
import Watchlist from '../../components/Watchlist'
import { AppContext } from '../../context/app_context'
import './index.css'

const ActiveTrades = () => {
    let { user, favorite, openTrades, setCloseTrades, setFavorite, setOpenTrades } = useContext(AppContext)

    // console.log(favorite, OpenTrades);
    // useEffect(() => {
    //     const makeAServerCall = async (user) => {
    //         let response = await getFavoritesAndTrades(user._id)
    //         console.log(response);
    //         return response
    //     }
    //     makeAServerCall(user)
    //     // console.log(serverResponse);
    // }, [user])
    if (user && favorite === undefined) {
        const makeAServerCall = async () => {
            let response = await getFavoritesAndTrades(user._id)
            setFavorite(response.data.watchList)
            setCloseTrades(response.data.closeTrades)
            setOpenTrades(response.data.openTrades)
            console.log('Trades');
        }
        makeAServerCall(user._id)
    }

    return (
        <div id='trades'>
            <OpenTrades OpenTrades={openTrades} />
            <Watchlist favorite={favorite} />
        </div>

    )
}

export default ActiveTrades