import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app_context'
import { getFavorite, getFavoritesAndTrades } from '../serverCall'

const Watchlist = () => {

    const { favorite, user, setFavorite, openTrade, setOpenTrade } = useContext(AppContext)

    useEffect(() => {
        const makeAServerCall = async () => {
            const serverResponse = await getFavoritesAndTrades(user._id)
            // setFavorite(serverResponse.data.watchList)
            // setOpenTrade(serverResponse.data.openTrades)
        }
        makeAServerCall()

    }, [user, setFavorite, setOpenTrade])
    // console.log(favorite, openTrade);


    return (
        <div>Watchlist</div>
    )
}

export default Watchlist