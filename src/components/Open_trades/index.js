import React from 'react'
import './index.css'

const OpenTrades = (props) => {
    console.log(props);

    return (
        <div className='open-trades-container' >
            <p>Trades</p>
            <div className='open-trades-table'>
                <div>
                    <p>Pair</p>
                    <p>position</p>
                    <p>Entry</p>
                    <p>TP</p>
                    <p>SL</p>
                    <p>P/L</p>
                </div>
            </div>
        </div >
    )
}

export default OpenTrades