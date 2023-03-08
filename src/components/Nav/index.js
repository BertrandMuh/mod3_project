import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/app_context'
import { getFavoritesAndTrades, updateTradesLists } from '../server_call/serverCall'
import './index.css'

const Nav = () => {
    const { favorite, openTrades, closeTrades, user, setFavorite, setCloseTrades, setOpenTrades } = useContext(AppContext)
    // let url = new URLSearchParams(window.location.search)
    useEffect(() => {
        if (user && favorite !== undefined) {
            let tradesLists = {
                openTrades,
                watchList: favorite,
                closeTrades
            }
            const makeAServerCall = async (data, userId) => {
                await updateTradesLists(data, userId)
            }
            makeAServerCall(tradesLists, user)
        }

        else if (user && favorite === undefined) {
            const makeAServerCall = async () => {
                let response = await getFavoritesAndTrades(user._id)
                setFavorite(response.data.watchList)
                setCloseTrades(response.data.closeTrades)
                setOpenTrades(response.data.openTrades)
            }
            makeAServerCall(user._id)
        }

    }, [favorite, openTrades, closeTrades, user, setCloseTrades, setFavorite, setOpenTrades])

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
                    History
                </Link>
            </div>
        </div>
    )
}

export default Nav