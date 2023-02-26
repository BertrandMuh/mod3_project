import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Nav = () => {
    return (
        <div className='header'>
            <div className='logo'>Trading Avenue</div>
            <div className="navbar">
                <Link to='/trading-avenue'>
                    Home
                </Link>
                <Link to='/trading-avenue/trades'>
                    Active Trades
                </Link>
                <Link to='/trading-avenue/account_summary'>
                    Performance
                </Link>
            </div>
        </div>
    )
}

export default Nav