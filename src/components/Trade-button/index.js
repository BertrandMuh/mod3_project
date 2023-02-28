import React from 'react'
import './index.css'

const TradeButtons = () => {

    return (
        <div className='trade-btn container'>
            {/* <button type='button' className='trade btn'>
                New order
            </button> */}
            <div className='position'>
                <div>
                    <div className='flex-center order'>
                        <p>New Trade</p>
                        {/* <button className='market btn' key="mkt-execution">Market order</button> */}
                        {/* <button className='entry btn' key="mkt-order">Entry order</button> */}
                    </div>
                </div>
                <div>

                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Stop Loss <span>(price)</span></p>
                        <input type="number" />
                        {/* <p>price</p> */}
                    </div>
                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Take Profit <span>(price)</span></p>
                        <input type="number" />
                        {/* <p>price</p> */}
                    </div>

                </div>
                <div className='flex-center buy-sell-container'>
                    <button type='button' className='sell btn'>Sell</button>
                    <button type='button' className='buy btn'>Buy</button>
                </div>
                {/* <div className='submit-btn-container'><button className='submit btn' type='button'>Submit</button></div> */}

            </div>
        </div>
    )
}

export default TradeButtons