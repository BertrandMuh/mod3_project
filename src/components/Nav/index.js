import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/app_context'
import { updateTradesLists } from '../serverCall'
import './index.css'

const Nav = () => {
    const { favorite, openTrades, closeTrades, user } = useContext(AppContext)
    // let url = new URLSearchParams(window.location.search)
    // useEffect(() => {
    //     let tradesLists = {
    //         openTrades,
    //         watchList: favorite,
    //         closeTrades
    //     }
    //     console.log(tradesLists);
    //     const makeAServerCall = async (data, userId) => {
    //         let serverRequest = await updateTradesLists(data, userId)
    //         console.log(serverRequest);
    //     }
    //     makeAServerCall(tradesLists, user)

    // }, [favorite, openTrades, closeTrades, user])

    return (
        <div className='header nav'>
            <div className='logo'>
                <p id='tbx'>TBX</p>
                <p>Trading Avenue</p>
            </div>
            <div className="navbar">
                <Link to='/trading-avenue.com'>
                    Home
                </Link>
                <Link to='/trading-avenue.com/trades'>
                    Trades
                </Link>
                <Link to='/trading-avenue.com/account_summary'>
                    Performance
                </Link>
            </div>
        </div>
    )
}

export default Nav