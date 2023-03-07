import React, { useEffect, useState } from 'react'

import './index.css'

const TradeButtons = (props) => {
    let { item } = props
    let pair = new URLSearchParams(window.location.search).get('pair')
    // console.log(pair);
    const [tradeAction, setTradeAction] = useState('Sell')
    const [tpAndSL, setTpAndSL] = useState({ tp: '', sl: '' })
    const [disabled, setDisabled] = useState(false)

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

    const handleSubmit = () => {
        let data = {
            pair,
            position: tradeAction,
            entry: item[0].mid.c,
            tp: tpAndSL.tp,
            sl: tpAndSL.sl,
            date: new Date().toUTCString()
        }
    }

    useEffect(() => {

        let buyInput = document.querySelectorAll('input')[1];
        let sellInput = document.querySelectorAll('input')[0];
        let borderColorWhenInvalid = '1px solid red'
        let borderColorWhenValid = '1px solid black'

        if (tradeAction === 'Sell') {
            console.log(tradeAction, tpAndSL.tp >= Number(item[0].mid.c));
            if (tpAndSL.tp >= Number(item[0].mid.c) && tpAndSL.tp !== '') {
                buyInput.style.border = borderColorWhenInvalid
                setDisabled(true)

            }

            else if (tpAndSL.sl <= Number(item[0].mid.c) && tpAndSL.sl !== '') {
                sellInput.style.border = borderColorWhenInvalid
                setDisabled(true)
            }
            else {
                buyInput.style.border = borderColorWhenValid
                sellInput.style.border = borderColorWhenValid
                setDisabled(false)
            }
        }
        else if (tradeAction === 'Buy') {
            if (tpAndSL.tp <= Number(item[0].mid.c) && tpAndSL.tp !== '') {
                buyInput.style.border = borderColorWhenInvalid
                setDisabled(true)
            }
            else if (tpAndSL.sl >= Number(item[0].mid.c) && tpAndSL.sl !== '') {
                sellInput.style.border = borderColorWhenInvalid
                setDisabled(true)
            }

            else {
                sellInput.style.border = borderColorWhenValid
                buyInput.style.border = borderColorWhenValid
                setDisabled(false)
            }
        }


    }, [tradeAction, tpAndSL, item])

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
                        <input type="number" className='trade-input' name='sl' step={step} value={tpAndSL.sl} onChange={(e) => handleChange(e)} />

                    </div>
                    <div className='flex-space-btw sl-tp'>
                        <p className='input-label'>Take Profit <span>(price)</span></p>
                        <input type="number" className='trade-input' name='tp' step={step} value={tpAndSL.tp} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div className='flex-center buy-sell-container'>
                    <button type='button' className='sell btn trade-position' onClick={(evt) => handleClick(evt)}>Sell</button>
                    <button type='button' className='buy btn' onClick={(evt) => handleClick(evt)}>Buy</button>
                </div>
                <div className='submit-btn-container'>
                    <button className='submit btn' type='button' disabled={disabled}>Submit</button>
                </div>

            </div>
        </div>
    )
}

export default TradeButtons