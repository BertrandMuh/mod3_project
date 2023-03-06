import React, { useEffect, useState } from 'react'
import './index.css'

const TradeButtons = () => {
    let pair = new URLSearchParams(window.location.search).get('pair')
    // console.log(pair);
    const [tradeAction, setTradeAction] = useState('Sell')
    const [tpAndSL, setTpAndSL] = useState({ tp: '', sl: '' })

    const handleClick = (el) => {
        let { textContent } = el.target
        let authTabChildren = Array.from(document.getElementsByClassName('buy-sell-container')[0].children)
        authTabChildren.forEach(child => {
            if (child.textContent === textContent) {
                child.classList.add('trade-position')
                setTradeAction(textContent)
            }
            else {
                child.classList.remove('trade-position')
            }
        })
    }

    const handleChange = (el) => {
        let { name, value } = el.target
        setTpAndSL({
            ...tpAndSL,
            [name]: value
        })
    }


    useEffect(() => {
        console.log(tradeAction);
        console.log(Array.from(document.getElementsByClassName('buy-sell-container')[0].children));
        console.log(tpAndSL);
    }, [tradeAction, tpAndSL])
    let step = pair.includes('JPY') ? '0.001' : '0.00001'
    return (
        <div className='trade-btn container'>

            <div className='position'>
                <div>
                    <div className='flex-center order'>
                        <p>New Trade</p>

                    </div>
                </div>
                <div>

                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Stop Loss <span>(price)</span></p>
                        <input type="number" name='sl' step={step} onChange={(e) => handleChange(e)} />

                    </div>
                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Take Profit <span>(price)</span></p>
                        <input type="number" name='tp' step={step} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className='flex-center buy-sell-container'>
                    <button type='button' className='sell btn trade-position' onClick={(evt) => handleClick(evt)}>Sell</button>
                    <button type='button' className='buy btn' onClick={(evt) => handleClick(evt)}>Buy</button>
                </div>
                <div className='submit-btn-container'><button className='submit btn' type='button'>Submit</button></div>

            </div>
        </div>
    )
}

export default TradeButtons