import React from 'react'
import './index.css'

const ActiveTrades = () => {
    return (
        <div id='trades'>
            <h2>Trades</h2>
            <div id='active-trades'>
                <h6>Pair</h6>
                <h6>Position</h6>
                <h6>Entry</h6>
                <h6>Stop Loss</h6>
                <h6>Take Profit</h6>
                <h6>Action</h6>
            </div>
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