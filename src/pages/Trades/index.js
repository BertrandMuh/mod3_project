import React, { useContext, useEffect } from 'react'
import OpenTrades from '../../components/Open_trades'
import { getFavoritesAndTrades } from '../../components/serverCall'
import Watchlist from '../../components/Watchlist'
import { AppContext } from '../../context/app_context'
import './index.css'

const ActiveTrades = () => {
    let { user, favorite, openTrades } = useContext(AppContext)

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

    return (
        <div id='trades'>
            {/* <h2>Trades</h2> */}
            <div>
                <OpenTrades OpenTrades={openTrades} />
                <Watchlist favorite={favorite} />
            </div>
            {/* <div id='active-trades'>
                <>Pair</>
                <h6>Position</h6>
                <h6>Entry</h6>
                <h6>Stop Loss</h6>
                <h6>Take Profit</h6>
                <h6>Action</h6>
            </div> */}
            {/* <div id='market-order'>
                <h5>Pair</h5>
                <h5>Position</h5>
                <h5>Entry</h5>
                <h5>Stop Loss</h5>
                <h5>Take Profit</h5>
                <h5>Action</h5>
            </div> */}
        </div>
    )
}

export default ActiveTrades