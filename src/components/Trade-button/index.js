import React from 'react'
import './index.css'

const TradeButtons = () => {

    return (
        <div className='trade-btn container'>
            {/* <button type='button' className='trade btn'>
                New order
            </button> */}
            <div>
                <div className='position'>
                    <div className='flex-center order'>
                        <button className='market btn' key="mkt-execution">Market order</button>
                        <button className='entry btn' key="mkt-order">Entry order</button>
                    </div>
                    <div className='flex-center buy-sell-container'>
                        <button type='button' className='sell btn'>Sell</button>
                        <button type='button' className='buy btn'>Buy</button>
                    </div>
                </div>
                <div>

                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Stop Loss</p>
                        <input type="number" />
                        <p>20pips</p>
                    </div>
                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Take Profit</p>
                        <input type="number" />
                        <p>10pips</p>
                    </div>
                </div>
                <div class='submit-btn-container'><button className='submit btn' type='button'>Submit</button></div>

            </div>
        </div>
    )
}

export default TradeButtons