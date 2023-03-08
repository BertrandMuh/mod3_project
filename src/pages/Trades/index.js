import React, { useContext } from 'react'
import OpenTrades from '../../components/Open_trades'
import { getFavoritesAndTrades } from '../../components/server_call/serverCall'
import Watchlist from '../../components/Watchlist'
import { AppContext } from '../../context/app_context'
import './index.css'

const ActiveTrades = () => {
    let { user, favorite, setCloseTrades, setFavorite, setOpenTrades } = useContext(AppContext)

    if (user && favorite === undefined) {
        const makeAServerCall = async () => {
            let response = await getFavoritesAndTrades(user._id)
            setFavorite(response.data.watchList)
            setCloseTrades(response.data.closeTrades)
            setOpenTrades(response.data.openTrades)
        }
        makeAServerCall(user._id)
    }

    return (
        <div id='trades'>
            <OpenTrades />
            <Watchlist />
        </div>

    )
}

export default ActiveTrades