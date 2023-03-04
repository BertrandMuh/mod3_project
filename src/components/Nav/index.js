import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import logo from '../../images/logo.jpg'

const Nav = () => {
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